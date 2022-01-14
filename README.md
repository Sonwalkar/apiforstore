# Api For store

### Description

This project is for getting a API request, process data and send response.
It computes the net amount, taxes final amount, total tax amount, Total amount, discount 5% if bill over 2000INR and the final bill amount.

### Languages and Framework

- Front-End Technology:
    - Html
    - Css
    - JavaScript
    - Bootstrap

- Back-End Technology:
    - Python
    - Django

### Step by step Process to run locally

1. Make sure python installed on loacl machine

2. Also make sure django is also installed on local machine

3. First clone this [GitHub](https://github.com/Sonwalkar/apiforstore.git) repository locally

4. Install all the required packages listed in "requirement.txt" file by executing command `pip install -r requirements.txt` 

5. Go to apiForStore/settings.py file change the value of "DEBUG=False" to "DEBUG=True" and Comment out below value.

    > SECURE_HSTS_SECONDS = 1000

    > SECURE_SSL_REDIRECT = True 

    > CSRF_COOKIE_SECURE = True 
    
    > SESSION_COOKIE_SECURE = True 
    
    > SECURE_HSTS_INCLUDE_SUBDOMAINS = True 
    
    > SECURE_HSTS_PRELOAD = True
