# API For store

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

4. cd `apiforstore`

5. Install all the required packages listed in "requirements.txt" file by executing command `pip install -r requirements.txt` 

6. Go to apiForStore/settings.py file change the value of "DEBUG=False" to "DEBUG=True" and Comment out below value.

    > SECURE_HSTS_SECONDS = 1000

    > SECURE_SSL_REDIRECT = True 

    > CSRF_COOKIE_SECURE = True 
    
    > SESSION_COOKIE_SECURE = True 
    
    > SECURE_HSTS_INCLUDE_SUBDOMAINS = True 
    
    > SECURE_HSTS_PRELOAD = True

7. run `python manage.py runserver`

8. open browser then go to `http://127.0.0.1:8000/` if not work in normal mode try in incognito mode.



#### Note
```
I use the date and time at the time of request to get
and data can be stored in the database and retrieved but as not mentioned in the task document I not did

```

# API Documentation

### Request

`https://apiforstore.herokuapp.com/`

```
headers
Accept:
"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",

"Content-Type": "application/json;",
    
"X-CSRFToken": `csrf token Value`,
```
```
Http Method
POST
```

```
[
    {
       "item": string,
       "itemCategory": string,
       "quantity": number,
       "price": number
   },
   {
       "item": string,
       "itemCategory": string,
       "quantity": number,
       "price": number
   }
]
```
### Response

```
[
    [
        {
            finalPrice: number,
            item: string,
            itemCategory: string,
            netAmount: number,
            price: number,
            quantity: number,
            taxAmount: number,
            taxRate: number
        }
    ],
    [
        dateOfPurchase: string,
        discountAmount: number,
        totalAmount: number,
        totalAmountPayable: number,
        totalTaxAmount: number
    ]
]
```

