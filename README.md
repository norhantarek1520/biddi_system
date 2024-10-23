# Biddi system 

# Introduction
Biddie System is a platform designed to facilitate online bidding and auctions for various products and services. 
It provides a user-friendly interface for buyers to discover and participate in bidding events, 
while offering vendors a platform to showcase their products or services and engage with potential customers.

# Database Relationships
## User
  - One-to-many relationship with Cart and VendorProfile.
## Cart
  -One-to-many relationship with Item.
  -Belongs to a User.
## Item
  - Many-to-many relationship with Cart through the cartItems field in Cart.
  - Belongs to a Category.
  - Can have multiple Subcategory associations.
## VendorProfile
  - Belongs to a User.
  - Has many-to-many relationships with Review and Category.
## Category
 - Has one-to-many relationships with Item and Subcategory.
## Subcategory
- Belongs to a Category.
- Has many-to-one relationship with Item.

# Database schema and fetures 



# Category:
| Column Name |  Type | description |
| ---| ---| --- |
|title| (string)| Category title|
|slug| (string)| Unique slug for the category|
|description| (string)| Category description|
|image_link| (string)| Image URL for the category|

# Subcategory:
| Column Name |  Type | description |
| ---| ---| --- |
|title| (string)| Subcategory title|
|slug| (string)| Unique slug for the subcategory|
|description| (string)| Subcategory description|
|image_link| (string)| Image URL for the subcategory|
|categoryId| (ObjectId)| Reference to the parent category|

# User: 
| Column Name |  Type | description |
| ---| ---| --- |
|name| (string)| User's name|
|email| (string)| User's email address (unique)|
|phone| (string)| User's phone number (optional)|
|password| (string)| User's password|
|role| (string)| User's role (e|g|, admin, user, vendor)|
|address| (object)| User's address details (address1, address2, city, country, zip)|
|passwordChangedAt| (date)| Timestamp for when the password was last changed|
|passwordResetCode| (string)| Password reset code|
|passwordResetExpires| (date)| Password reset code expiration date|
|passwordResetVerified| (boolean)| Indicates if password reset was verified|
|active| (boolean)| Indicates if the user is active|


# Cart
| Column Name |  Type | description |
| ---| ---| --- |
|user| (ObjectId)| Reference to the user owning the cart|
|cartItems| (array of objects)| Array of cart items, each containing:
|item_id| (ObjectId)| Reference to the item|
|item_name| (string)| Item name|
|quantity| (number)| Quantity of the item|
|color| (string)| Item color|
|price| (number)| Item price|
|totalCartPrice| (number)| Total price of the cart|

# Item
| Column Name |  Type | description |
| ---| ---| --- |
|itemTitle| (string)| Item title|
|slug| (string)| Unique slug for the item|
|cancellationPolicy| (string)| Cancellation policy for the item|
|imageCover| (string)| Image URL for the item's cover|
|images| (array of strings)| Array of image URLs for the item|
|availability| (enum)| Item availability (in stock, out of stock)|
|description| (string)| Item description|
|sold| (number)| Number of items sold|
|price| (number)| Item price|
|category_id| (ObjectId)| Reference to the item's category|
|subcategories_id| (array of ObjectIds)| References to the item's subcategories|
|vendor_id| (ObjectId)| Reference to the vendor selling the item|
|ratingsAverage| (number)| Average rating for the item|
|type| (enum)| Item type (product or service)|
|serviceDuration| (string)| Service duration (for service type)|
|appointmentSlots| (array of strings)| Appointment slots (for service type)|
|brand| (string)| Brand of the product (for product type)|
|model| (string)| Model of the product (for product type)|
|size| (string)| Size of the product (for product type)|
|weight| (number)| Weight of the product (for product type)|
|quantity| (number)| Quantity of the product available|
|colors| (array of strings)| Available colors of the product|


# VendorProfile:
| Column Name |  Type | description |
| ---| ---| --- |
|userId| (ObjectId)| Reference to the user associated with the vendor profile|
|profileImgLink| (string)| URL for the vendor's profile image|
|storeHours| (string)| Store hours|
|policies| (string)| Vendor policies|
|contact| (string)| Contact information|
|reviews| (array of ObjectIds)| References to reviews associated with the vendor|
|categoryId| (ObjectId)| Reference to the vendor's category|
|cuisine| (string)| Cuisine type (for food vendors)|
|specialties| (array of strings)| Vendor's specialties|
|deliveryRadius| (number)| Delivery radius|
|minimumOrderValue| (number)| Minimum order value|
|deliveryFees| (number)| Delivery fees|
|bio| (string)| Vendor bio|
|type| (enum)| Vendor type (Wholesalers, Businesses, Individuals, agency)|
|ratingsAverage| (number)| Average rating for the vendor|
|locations| (array of objects)| Vendor locations (alias, details, city, postalCode)|


