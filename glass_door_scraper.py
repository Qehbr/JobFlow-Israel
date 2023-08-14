import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time


# helper function
def is_float(string):
    try:
        float(string)
        return True
    except ValueError:
        return False


# Set up the browser
driver = webdriver.Chrome()
driver.get('https://www.glassdoor.com/Job/jobs.htm')

# Enter job search
search_query = 'engineer'  # change to change search #
search = driver.find_element(By.ID, 'searchBar-jobTitle')
search.send_keys(search_query)

location_query = 'Israel'  # change to change location #
location = driver.find_element(By.ID, 'searchBar-location')
location.send_keys(location_query)

location.send_keys(Keys.ENTER)

found_jobs = []
# Loop while there are new jobs
try:
    while True:
        # Wait for page to load
        time.sleep(5)
        # Get jobs from the page
        jobs = driver.find_elements(By.CLASS_NAME, 'react-job-listing')
        for job in jobs:

            # Try to close pop up message (sometimes it pops before clicking the job)
            try:
                popup = driver.find_element(By.CLASS_NAME, 'actionBarMt0')
                popup.find_element(By.TAG_NAME, 'button').click()
            except:
                pass
            # Click the job to get more info (description, ratings etc.)
            job.click()
            # Try to close pop up message again (sometimes it pops after clicking the job)
            try:
                popup = driver.find_element(By.CLASS_NAME, 'actionBarMt0')
                popup.find_element(By.TAG_NAME, 'button').click()
            except:
                pass

            # Wait for job info to load
            time.sleep(2)

            # Get job title
            try:
                title = job.find_element(By.CLASS_NAME, 'job-title').text
            except:
                title = "NA"

            # Get job location
            try:
                loc = job.find_element(By.CLASS_NAME, 'location').text
            except:
                loc = "NA"

            # Get job employer and rating
            try:
                employer_and_rating = job.find_element(By.CSS_SELECTOR, '[id^="job-employer"]')
                if employer_and_rating.text.endswith("★"):
                    employer = employer_and_rating.text[:-5]
                    rating = employer_and_rating.text[-5:-1]
                else:
                    employer = employer_and_rating.text
                    rating = '-1'
            except:
                employer = "NA"
                rating = -1

            # Get job description
            try:
                description = driver.find_element(By.CLASS_NAME, 'jobDescriptionContent').text
                description = description.replace("\n", " ")
            except:
                description = "NA"

            # Get job salary estimate
            try:
                salary_estimate = job.find_element(By.CLASS_NAME, 'salary-estimate').text
            except:
                salary_estimate = -1

            # Get if the job is easy apply
            try:
                job.find_element(By.CLASS_NAME, 'easy-apply')
                easy_apply = 1
            except:
                easy_apply = 0

            # Get info about the company
            company_size = -1
            company_type = -1
            company_sector = -1
            company_founded = -1
            company_industry = -1
            company_revenue = -1
            try:
                info = driver.find_element(By.ID, 'CompanyContainer')
                info = info.find_element(By.CLASS_NAME, 'd-flex')
                info = info.find_elements(By.CLASS_NAME, 'd-flex')
                for i in info:
                    kaka = i.text.lower()
                    if i.text.lower().startswith('size'):
                        company_size = i.text[5:]
                    elif i.text.lower().startswith('type'):
                        company_type = i.text[5:]
                    elif i.text.lower().startswith('sector'):
                        company_sector = i.text[7:]
                    elif i.text.lower().startswith('founded'):
                        company_founded = i.text[8:]
                    elif i.text.lower().startswith('industry'):
                        company_industry = i.text[9:]
                    elif i.text.lower().startswith('revenue'):
                        company_revenue = i.text[8:]
            except:
                pass

            # Get company ratings
            career_opportunities_rating = -1
            comp_and_benefits_rating = -1
            culture_and_values_rating = -1
            senior_management_rating = -1
            work_life_balance_rating = -1
            try:
                ratings = driver.find_element(By.CSS_SELECTOR, '[data-test^="company-ratings"]')
                ratings = ratings.find_elements(By.TAG_NAME, 'span')
                ratings_num = []
                for r in ratings:
                    if is_float(r.text):
                        ratings_num.append(float(r.text))
                career_opportunities_rating = ratings_num[0]
                comp_and_benefits_rating = ratings_num[1]
                culture_and_values_rating = ratings_num[2]
                senior_management_rating = ratings_num[3]
                work_life_balance_rating = ratings_num[4]
            except:
                pass

            # Append all the info to the list of jobs
            found_jobs.append({'title': title,
                               'employer': employer,
                               'location': loc,
                               'rating': rating,
                               'description': description,
                               'salary_estimate': salary_estimate,
                               'easy_apply': easy_apply,
                               'career_opportunities_rating': career_opportunities_rating,
                               'comp_and_benefits_rating': comp_and_benefits_rating,
                               'culture_and_values_rating': culture_and_values_rating,
                               'senior_management_rating': senior_management_rating,
                               'work_life_balance_rating': work_life_balance_rating,
                               'company_size': company_size,
                               'company_type': company_type,
                               'company_sector': company_sector,
                               'company_founded': company_founded,
                               'company_industry': company_industry,
                               'company_revenue': company_revenue
                               })

        # Go to next page
        nxt = driver.find_element(By.CLASS_NAME, 'nextButton')
        # If button disabled (no more jobs) stop searching
        if nxt.get_attribute('disabled type') or nxt.get_attribute('disabled'):
            break
        nxt.click()
except:
    pass
# Make dataframe and save it as csv
columns = ['title', 'employer', 'location', 'rating', 'description', 'salary_estimate', 'easy_apply',
           'career_opportunities_rating', 'comp_and_benefits_rating', 'culture_and_values_rating',
           'senior_management_rating', 'work_life_balance_rating', 'company_size', 'company_type', 'company_sector',
           'company_founded', 'company_industry', 'company_revenue']
df = pd.DataFrame([{col: job[col] for col in columns} for job in found_jobs])
df.to_csv(f'jobs_{search_query}_{location_query}.csv')
