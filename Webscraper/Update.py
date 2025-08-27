import os
import requests
import json
import csv
import time

# downloads edgar data into folder 
# then second function should output into readable csv to upload to supabase
class Update():

    def __init__(self, output_path=None, mode='old'):

        self.output_path = output_path

        self.COMPANY_LIST = dict(line.strip().split('\t') for line in open('Webscraper/ticker.txt'))

        self.companies_to_get = {}

        if mode == 'old':

            self.files_found = [f for f in os.listdir(self.output_path) if f.endswith('.txt')]
            print(f"Found {len(self.files_found)} files...")

            for ticker, cik in self.COMPANY_LIST.items():

                if ticker.upper() + ".txt" not in self.files_found:

                    self.companies_to_get[ticker] = cik

        else:

            self.companies_to_get = self.COMPANY_LIST


    def getData(self):

        headers = {
            'User-Agent': f'{_USER}'  # Replace with your actual contact info
        }

        for ticker, cik in self.companies_to_get.items():

            cik = cik.zfill(10)

            url = f'https://data.sec.gov/api/xbrl/companyfacts/CIK{cik}.json'

            try:

                self.save(ticker, self.request(url, headers))

            except Exception as e:

                print(f"Error for {ticker}:{e}")


    def request(self, url, headers):

        time.sleep(0.1)

        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            data = response.json()
        else:
            print(f'Server Request Error: {response.status_code}')

        return data

    def save(self, name, data):

        path = os.path.join(self.output_path, f'{name.upper()}.txt')

        with open(path, 'w') as f:
            json.dump(data, f)

    def toCSV(self):

        first = True

        for file in self.files_found:

            self.write(file, write_header=first)
            first = False

    def write(self, file, write_header=False):
        import os
        import json
        import csv

        path = os.path.join(self.output_path, file)  # Path to your JSON file

        with open(path, 'r', encoding='utf-8') as f_json, \
            open('data.csv', 'a', newline='', encoding='utf-8') as f_csv:  # append mode

            json_data = json.load(f_json)
            fieldnames = ['CIK', 'ticker', 'entity name', 'fiscal', 'date', 'label', 'value']
            writer = csv.DictWriter(f_csv, fieldnames=fieldnames)

            if write_header:
                writer.writeheader()

            latest_records = {}

            for fact_group in json_data.get('facts', {}).get('us-gaap', {}).values():
                label = fact_group.get('label')
                for unit_list in fact_group.get('units', {}).values():
                    for record in unit_list:
                        fy = record.get('fy')
                        fp = record.get('fp')
                        date = record.get('end')
                        value = record.get('val')
                        cik = json_data.get('cik')
                        entity = json_data.get('entityName')

                        if fy is None or fp is None or date is None:
                            continue

                        fiscal = f"{fy}{fp}"
                        key = (fiscal, label)

                        if key not in latest_records or latest_records[key]['date'] < date:
                            latest_records[key] = {
                                'CIK': cik,
                                'ticker': file.replace('.txt', ''),
                                'entity name': entity,
                                'fiscal': fiscal,
                                'date': date,
                                'label': label,
                                'value': value
                            }

            for row in latest_records.values():
                writer.writerow(row)




if __name__ == '__main__':


    OUTPUT_PATH = "Webscraper/Data"
    _USER = "adamdouangprachanh.hba2026@ivey.ca"


    update = Update(OUTPUT_PATH, mode='old')

    #update.getData()

    update.toCSV()
