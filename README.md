# Wild-Life-Tracker

---

## Team
-  E/17/006, Alahakoon A. M. H. H., [e17006@eng.pdn.ac.lk](mailto:e17006@eng.pdn.ac.lk)
-  E/17/176, Kumara W.M.E.S.K, [e17176@eng.pdn.ac.lk](mailto:e17176@eng.pdn.ac.lk)
-  E/17/338, Srimal R. M. L. C., [e17338@eng.pdn.ac.lk](mailto:e17338@eng.pdn.ac.lk)

## Table of Contents
1. [Overview](#Overview)
2. [Goals](#Goals)
3. [Solution Architecture](#solution-Architecture )
4. [Hardware List](#Hardware-List)
5. [Testing Plan](#Testing-Plan)
6. [Security Features](#Security-Features)
7. [System Overview](#System-Overview)
8. [Hardware Design](#Hardware-Design)
9. [Implementation](#Implementation)
10. [Links](#links)

---

## Overview
    Traditional method of wildlife researching in Sri Lanka and many developing as
    well as developed countries is stay in wild areas for long time and seeing animals
    randomly and identify areas that animals are mostly active. This process takes longer
    time and researchers have to stay in the wild are throughout this longer time period.
    So, this is a hard process and sometimes their life is in danger because there is a
    probability to face an attack by wild animals while they are in jungle. And also, some
    animals are hiding when they sense that humans are around. Therefore, this method of
    observing or discovering certain animals is very ineffective for research work.
    A lot of time, money and human resources are spent in vain for traditional tracking
    of wild animals for researchers.

## Goals
-   Introduce a effective and efficient method for wildlife researchs.
-   Find a solution that saves time, money and lives of wildlife researchers.  

## Solution Architecture
    This system is consist of three major components, A hardware unit, A clod server and a web App.
    A hardware unit consist of camera traps, sensors and location tracker. A one unit of thease three
    compnents make a station. Researchers need to setup this station in the researching area. One researcher
    can have more than one stations establish in different places if he/she need. The sensors in a station
    can detect animals when they are in the sensing range and it will trigger the camera. A real time photo
    is captured at that moment and they are stored in the station it self and also they are sent to the 
    cloud server. Then the researcher can analyse these observed data through the web app.

## Hardware List
    | Item                         | Quantity  | Unit Cost  | Total    |
    | -----------------------------|:---------:|:----------:|---------:|
    | Infrared PIR motion Sensor   |   1       | 325 LKR    | 325 LKR  |
    | ESP32 Cam Board              |   1       | 1890 LKR   | 1890 LKR |
    | FTDI connector               |   1       | 470 LKR    | 470 LKR  |
    | Sim800L V2.0 GSm GPRS Module |   1       | 1790 LKR   | 1790 LKR |
    | Ublox NEO_6M GPS module      |   1       | 1390 LKR   | 1390 LKR |
    | 1W LED                       |   1       | 22 LKR     | 22 LKR   |
    | ATmega328p-pu chip           |   1       | 375 LKR    | 375 LKR  |
    | Solar Panel (>6V) 165mA      |   1       | 560 LKR    | 560 LKR  |
    | Battery Charger              |   1       | 120 LKR    | 120 LKR  |
    | 3.7V 1800mAh batteris        |   2       | 225 LKR    | 550 LKR  |
    | Other Expenditures           |   1       | 1000 LKR   | 1000 LKR |

## Testing Plan
    | Unit Testing        | Integration Testing | End to End Testing  |
    |---------------------|:-------------------:|:-------------------:|
    |                     |                     |                     |
    |1. Testing           |1. Test front end and|1. Test overall      |  
    |functianlity of each |back end integration.|functionality of the |
    |page of the web app. |                     |web app and hardware |
    |                     |2. Test database and |device.              |
    |2. Test login,       |backend integration. |                     |
    |registration and form|                     |2. Check user        | 
    |validations.         |3. Test web app and  |registration,        |
    |                     |hardware device      |registration approval|
    |3. Test sensors and  |integration.         |                     |
    |hardware components  |                     |3. Check data flow   |
    |                     |                     |from devices to cloud| 

#### Testing Tools   
1. Frontend Testing
    - Selenium automated testing framework is used to test the frontend of the web app. 
    - Selinium supports vast amout of different browsers and platforms. Also, it supports testing scripts written in multiple languages.
    - Form submissions, form validations, response handling functionalities and other front end functionalities are tested using Selenium.

2. Backend Testing
    - Postman API testing tool is used to test the backend of the web application.
    - Postman allows to send HTTP requests using a GUI which makes it easier to test the REST API.
    - Postman is used to test routings in the backend, authentication and authorization, error handlings ans sending responses in the API.

## Security Features
Our system handles really sensitive information about wildlife. Therefore, the CIA triad (Confidentiality, Availability, Integrity) of the application is maintained in the best way possible.

![image](https://github.com/hansa31/e17-3yp-Wild-Life-Tracker/blob/main/docs/images/CIA-Triad.png)

- JsonWebTokens (JWT) are used for the authorization of users. These tokens are stateless, portable, high performing and decentralized which improves the security and scalability of the web application as well.
- HTTPS protocol is used for secure communication.
- A special system of user registration is introduced to ensure the users of our web app are researchers. 

## System Overview
![image](https://github.com/EsaraSithumal/e17-3yp-Wild-Life-Tracker/blob/main/docs/images/System%20Overview.PNG)

## Hardware Design
![image](https://github.com/EsaraSithumal/e17-3yp-Wild-Life-Tracker/blob/main/docs/assets/images/HardwareOrg.jpg)

## Implementation
User Interfaces
![video](https://drive.google.com/file/d/1mpXVvSlbE2Xvl3koiyFE5fgIOMTO5rwZ/view?usp=sharing)

## Links

- <a href = "https://github.com/cepdnaclk/e17-3yp-Wild-Life-Tracker" target = "_blank"> Project Repository </a>
- <a href = "https://cepdnaclk.github.io/e17-3yp-Wild-Life-Tracker/" target = "_blank">Project Page</a>
- <a href = "http://www.ce.pdn.ac.lk/" target = "_blank">Department of Computer Engineering</a>
- <a href = "https://eng.pdn.ac.lk/" target = "_blank">University of Peradeniya</a>


[//]: # (Please refer this to learn more about Markdown syntax)
[//]: # (https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
