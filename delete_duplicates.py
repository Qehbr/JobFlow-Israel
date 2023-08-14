import pandas as pd

jobs = pd.read_csv("jobs_data software_Israel.csv", index_col=0)
jobs2 = pd.read_csv("jobs_data_Israel.csv", index_col=0)
jobs3 = pd.read_csv("jobs_developer_Israel.csv", index_col=0)
jobs4 = pd.read_csv("jobs_engineer_Israel.csv", index_col=0)
jobs5 = pd.read_csv("jobs_software_Israel.csv", index_col=0)
jobs6 = pd.read_csv("jobs_developer software_Israel.csv", index_col=0)

all_jobs = pd.concat([jobs, jobs2, jobs3, jobs4, jobs5], axis=0)
all_jobs.drop_duplicates().reset_index(drop=True).to_csv('all_jobs.csv')


