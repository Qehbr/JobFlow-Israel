# **JobFlow-Israel: Project Overview**
![image](https://github.com/Qehbr/JobFlow-Israel/assets/49615282/c5e1d961-2e3e-4ec1-8026-099c30ed6b8f)

* Data Science React App about IT jobs in Israel for analyzing the current state
* Scraped over 600 descriptions of IT jobs in Israel
* Engineered features from the scraped data
* React App with visualization of work
* Hosted using Firebase with Firestorage containing the scraped data
* **Link to the project: [JobFlow - Israel](https://jobflow-israel.web.app)**
## Files:
  ### glass_door_scaper.py
* Script scraping the data from GlassDoor (optimized for August 2023) using Selenium
* With each job post, we got the following:
  * Title
  * Employer/Company:
    * Name
    * Rating
      * Career Opportunities
      * Compensation and benefits
      * Culture and Values
      * Senior management
      * Work life
    * Size
    * Sector
    * Year founded
    * Industry
    * Revenue
  * Location
  * Easy - Apply
### delete_duplicates.py
* Simple script for deleting duplicate values from scraped data and merging it to signle csv file
### data_cleaning.py
After scraping the data, I needed to clean it up. I made the following changes
* Converted columns to approproate datatypes
* Performed analysis of job titles
* Converted each job title to categorical values (QA, Developer, Engineer, Software Engineer, (Data) Analyst, Data Scientist, Student/Intern, Other). The result of distrubution can be seen here:
  
  ![image](https://github.com/Qehbr/JobFlow-Israel/assets/49615282/56fb997e-0c91-4e03-9e5f-7754031f251e)
* Performed feature extraction from founded year to get company age
* Converted each job location to categorical values of districts in Israel (Tel Aviv, Central, Southern, Notrhern, Israel (for jobs without specific location))
* Performed analysis of job's descriptions to get the most appearing words, the result can be seen here:
  ![image](https://github.com/Qehbr/JobFlow-Israel/assets/49615282/6f0fe379-4e42-4415-ad88-62c76d1f5743)
  ![image](https://github.com/Qehbr/JobFlow-Israel/assets/49615282/5aa5262a-c654-45a3-8c28-e04ddc4ed2e7)
* Performed feature extraction to check if description has specific keywords (AI, Python, Java, JavaScript, C++, React, SQL, AWS, GIT)
### React Files 
* Containing React App with visualizing the results, more graphs can be seen here: [JobFlow - Israel](https://jobflow-israel.web.app)
## Deploying
In this step, I built a React app with fancy design, visulizing the results I've got. 

The app hosted using Firebase with Firestorage containg the data. I have a limited quota, so if you do not see any graphs try again later!





