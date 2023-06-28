# Personal services platform project

## CLIENT PAGES/LOGIC

### Base structure for all pages:

-   Header (logo + nav:)
    -   if user is not logged in: Home, Services, Register, Login
    -   if user is logged in: Home, Services, Account, Logout
-   CUSTOM MAIN CONTENT
-   Footer

### Home page

-   basic home page content
-   all user's public services
    -   render on: server vs. client (to be determined in the future)
    -   random 6

### Services page

-   all services
    -   list ordered by: name (az/za), price(09/90)
    -   default: price 09

### 404

-   basic 404 page content

### Register page

-   Form: name, email, password
-   fetch()
-   basic validation

### Login page

-   Form: email, password
-   fetch()
-   basic validation

### Logout page

-   button for logout action (confirmation)

### Account page

-   my services list:
    -   service name
    -   price
    -   toggle
    -   edit
    -   delete
-   create new

### Account: create service page

-   form: service name, price, toggle

### Account: update service page

-   form: service name, price, toggle

## SERVER LOGIC

### Registration API

-   super strict validation
-   save into JSON

### Login API

-   super strict validation

### User Service API

-   get list
-   get single service info
-   create single service
-   update single service
-   delete single service
-   toggle single service visibility (disable/enable)
