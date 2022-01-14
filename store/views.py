# I use the date and time at the time of request to get
# and data can be stored in the database and retrieved but as not mentioned in the task document I not did

from django.shortcuts import render
from django.http import JsonResponse
import json
import datetime


def index(request):
    if request.method == "POST":

        # For store all data to send as response
        responseData = [[], []]

        # loads the json data From client
        data = json.loads(request.body)

        totalPrice = 0
        totalDiscountedPrice = 0

        # loop on each items
        for d in data:

            # Item data of each item
            itemInfo = d

            # to Calculate net amount of an item
            itemInfo['netAmount'] = d['price']*d['quantity']
            
            # If item category is clothes
            if d['itemCategory'].lower() == 'clothes':
            
                # if item price is less then 1000 INR
                if d["price"] < 1000:
                    
                    # calculate Total amount of an item including 5% tax up to 2 floating point
                    totalAmount = round((((5*d['price'])/100)+d['price'])*int(d['quantity']), 2)

                    # to calculate Total price of all items
                    totalPrice += totalAmount

                    itemInfo['finalPrice'] = totalAmount
                    itemInfo['taxRate'] = 5

                    # Calculate Tax amount of an item up to 2 floating point
                    itemInfo['taxAmount'] = round(((5*d['price'])/100)*int(d['quantity']), 2)

                # if item price is greater then or equal to 1000 INR
                else:

                    # calculate Total amount of an item including 12% tax up to 2 floating point
                    totalAmount = round((((12*d['price'])/100)+d['price'])*int(d['quantity']), 2)

                    # to calculate Total price of all items
                    totalPrice += totalAmount

                    itemInfo['finalPrice'] = totalAmount
                    itemInfo['taxRate'] = 12

                    # to calculate Total price of all items
                    itemInfo['taxAmount'] = round(((12*d['price'])/100)*int(d['quantity']), 2)

            # If item category is Food or medicine
            elif d['itemCategory'].lower() == 'food' or d['itemCategory'].lower() == 'medicine':
              
                # calculate Total amount of an item including 5% tax up to 2 floating point                
                totalAmount = round((((5*d['price'])/100)+d['price'])*int(d['quantity']), 2)

                # to calculate Total price of all items
                totalPrice += totalAmount

                itemInfo['finalPrice'] = totalAmount
                itemInfo['taxRate'] = 5

                # to calculate Total price of all items
                itemInfo['taxAmount'] = round(((5*d['price'])/100)*int(d['quantity']), 2)

            # If item category is music
            elif d['itemCategory'].lower() == 'music':

                # calculate Total amount of an item including 3% tax up to 2 floating point                
                totalAmount = round((((3*d['price'])/100)+d['price'])*int(d['quantity']), 2)

                # to calculate Total price of all items
                totalPrice += totalAmount

                itemInfo['finalPrice'] = totalAmount
                itemInfo['taxRate'] = 3

                # to calculate Total price of all items
                itemInfo['taxAmount'] = round(((3*d['price'])/100)*int(d['quantity']), 2)

            # If item category is imported
            elif d['itemCategory'].lower() == 'imported':

                # calculate Total amount of an item including 18% tax up to 2 floating point                
                totalAmount = round((((18*d['price'])/100)+d['price'])*int(d['quantity']), 2)

                # to calculate Total price of all items
                totalPrice += totalAmount

                itemInfo['finalPrice'] = totalAmount
                itemInfo['taxRate'] = 18

                # to calculate Total price of all items
                itemInfo['taxAmount'] = round(((18*d['price'])/100)*int(d['quantity']), 2)

            # If item category is Book or any other category added accedentelly it won't be calculated
            else:
                
                # calculate Total amount of an item excluding tax up to 2 floating point                
                totalAmount = d['price']*d['quantity']

                # to calculate Total price of all items
                totalPrice += totalAmount

                itemInfo['finalPrice'] = totalAmount
                itemInfo['taxRate'] = 0

                # to calculate Total price of all items
                itemInfo['taxAmount'] = 0

            
            # add each item to response data
            responseData[0].append(itemInfo)

        # total discount price is equal to total amount of all item if total price is less than 2000 
        totalDiscountedPrice = totalPrice
        
        # discount amount is 0 if total amount of all item is less than 2000
        discountAmount = 0
        
        # If total price is greater then 2000 then add discount of 5%
        if totalPrice > 2000:
            totalDiscountedPrice = totalPrice-((5*totalPrice)/100)
            discountAmount = round(((5*totalPrice)/100), 2)
        
        # date, total amount, discount amount and total payable amount add
        otherDetails = {'totalAmount': round(totalPrice,2), 'discountAmount': discountAmount, 'dateOfPurchase': datetime.datetime.now().strftime("%d %B %Y %I:%M%p"), 'totalAmountPayable': round(totalDiscountedPrice, 2)}
        
        # add total amp
        responseData[1].append(otherDetails)

        # sort data in ascending order
        responseData[0] = sorted(responseData[0], key=lambda k: k['itemCategory'])

        return JsonResponse(responseData, safe=False)

    return render(request, 'store/index.html')
