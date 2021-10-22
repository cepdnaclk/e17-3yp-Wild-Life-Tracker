package seltest.seltest;

import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.opera.OperaDriver;



/**
 * Page navigation test
 * Form validation test
 * User login test
 * User registration test
 * admin login test
 * password recovery test
 * Browsers : Opera, Edge, Chrome
 */
public class AppTest
{	
	String link = "http://localhost:3000";
	@Test
    public void navigationTest() throws InterruptedException
    {
    	//This script is for test all the navigations in the front end
    	
    	/* * load page
    	 * click login button
    	 * click register
    	 * back to sign in
    	 * check password reset
    	 * back to sign in
    	 * click Admin sign in
    	 * check password reset
    	 * Check home button*/
        
        //Test with Chrome browser
        //System.setProperty("webdriver.chrome.driver","src\\Drivers\\chromedriver_win32\\chromedriver.exe");
		//WebDriver driver = new ChromeDriver();
        
        //Test with Opera browser
		//System.setProperty("webdriver.opera.driver","src\\Drivers\\operadriver_win64\\operadriver_win64\\operadriver.exe");
    	//WebDriver driver = new OperaDriver();
        
    	//Test with Edge browser
        System.setProperty("webdriver.edge.driver","src\\Drivers\\edgedriver_win64\\msedgedriver.exe");
    	WebDriver driver = new EdgeDriver();
        
        driver.get(link);
        
        //user login test
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/a[1]")).click(); //click login button
        Thread.sleep(2000);
        String title = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[1]/h1")).getText();	//get title of page loaded
        Assert.assertEquals("Sign in",title);	//check whether it is sign in
        Thread.sleep(1000);
        
        //check the link to register page
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[6]/small/a[1]")).click(); //click register button
        Thread.sleep(2000);
        //check whether correct page is loaded
        String response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[1]/h1")).getText();
        Assert.assertEquals("Sign-up",response);
        //go back to sign in page
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[9]/small/a")).click();
        Thread.sleep(2000);
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[1]/h1")).getText();
        Assert.assertEquals("Sign in",response);
        //check password reset page
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[6]/small/a[2]")).click();
        Thread.sleep(5000);
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[1]/h1")).getText();
        Assert.assertEquals("Password Reset",response);
        //back to sign in from password reset
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[4]/small/a")).click();
        Thread.sleep(2000);
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[1]/h1")).getText();
        Assert.assertEquals("Sign in",response);
        //check link to admin sign in
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[6]/small/a[3]")).click();
        Thread.sleep(2000);
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[1]/h1")).getText();
        Assert.assertEquals("Admin Sign-in",response);
        //check link to password reset for admins
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[6]/small/a")).click();
        Thread.sleep(2000);
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[1]/h1")).getText();
        Assert.assertEquals("Password Reset",response);
        driver.findElement(By.xpath("/html/body/div/div/div/div/aside/div/div/a")).click();
        Thread.sleep(2000);
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/aside/div/div/div/h1")).getText();
        Assert.assertEquals("Wildlife Tracker",response);	//check whether home page is loaded
        //click on get started button
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/a[2]")).click(); //click register button
        Thread.sleep(2000);
        //check whether registration page is loaded
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[1]/h1")).getText();
        Assert.assertEquals("Sign-up",response);
        
        driver.close();
    }
    
    @Test
    public void formValidationTestIncorrectData() throws InterruptedException {
    	/*Test cases
    	 *click login button
    	 *enter invalid email and check => the invalid message is displayed
    	 *go to registration form
    	 		*enter invalid name,email,passwords and check : invalid feed backs are displayed
    	 *go to admin sign in and enter invalid email and check : invalid feed back is displayed
    	 *go to password resets and enter a invalid email: check invalid feed back is displayed*/
    	
    	//Test on Chrome browser
    	//System.setProperty("webdriver.chrome.driver","src\\Drivers\\chromedriver_win32\\chromedriver.exe");
    	//WebDriver driver = new ChromeDriver();
    	
    	//Test on edge Browser
    	System.setProperty("webdriver.edge.driver","src\\Drivers\\edgedriver_win64\\msedgedriver.exe");
    	WebDriver driver = new EdgeDriver();
    	
    	//Test on Opera Browser
    	//System.setProperty("webdriver.opera.driver","src\\Drivers\\operadriver_win64\\operadriver_win64\\operadriver.exe");
    	//WebDriver driver = new OperaDriver();
    	
        driver.get(link);
        
        //user login form test
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/a[1]")).click(); //click login button
        Thread.sleep(1000);
        //input invalid email address
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/input")).sendKeys("abcdefgh");	
        String response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/div")).getText();
        Assert.assertEquals("email is not valid! enter a valid email",response); 
        //go to registration page
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[6]/small/a[1]")).click(); //click register button
        Thread.sleep(1000);
        //enter invalid name
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/input")).sendKeys("abcd-='");	
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/div")).getText();
        Assert.assertEquals("The name can only contain letters",response);
        //enter invalid email
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[3]/input")).sendKeys("abcd'");	
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[3]/div")).getText();
        Assert.assertEquals("email is not valid! enter a valid email",response);
        //enter invalid password
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[5]/input")).sendKeys("abcd'");	
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[5]/div")).getText();
        Assert.assertEquals("password must be at least 8 characters",response);
        
        //enter a password does not match with previous one
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[6]/input")).sendKeys("ab'");	
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[6]/div")).getText();
        Assert.assertEquals("password doesn't match",response);
        
        //back to login
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[9]/small/a")).click();
        Thread.sleep(1000);
        //admin sign in
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[6]/small/a[3]")).click();
        Thread.sleep(1000);
        //enter invalid email
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/input")).sendKeys("abcdefgh");	
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/div")).getText();
        Assert.assertEquals("email is not valid! enter a valid email",response);
        //go to password reset
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[6]/small/a")).click();
        //enter invalid email
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/input")).sendKeys("abcdefgh");
        Thread.sleep(1000);
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/div")).getText();
        Assert.assertEquals("email is not valid! enter a valid email",response);
        
        driver.close();
    }
    
    @Test
    public void formValidationTestCorrectData() throws InterruptedException {
    	/*Test cases
    	 *click login button
    	 *enter valid email and check => the invalid message is not displayed
    	 *go to registration form
    	 		*enter valid name,email,passwords and check : invalid feed backs are not displayed
    	 *go to admin sign in and enter valid email and check : invalid feed back is not displayed
    	 *go to password resets and enter a valid email: check invalid feed back is not displayed*/
    	
    	//Test on Opera browser
    	//System.setProperty("webdriver.opera.driver","src\\Drivers\\operadriver_win64\\operadriver_win64\\operadriver.exe");
    	//WebDriver driver = new OperaDriver();
    	
    	//Test on Chrome browser
    	//System.setProperty("webdriver.chrome.driver","src\\Drivers\\chromedriver_win32\\chromedriver.exe");
    	//WebDriver driver = new ChromeDriver();
    	
    	//Test on edge Browser
    	System.setProperty("webdriver.edge.driver","src\\Drivers\\edgedriver_win64\\msedgedriver.exe");
    	WebDriver driver = new EdgeDriver();
        
        driver.get(link);
        
        //user login form test
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/a[1]")).click(); //click login button
        Thread.sleep(1000);
        //input valid email address
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/input")).sendKeys("abcd@gmail.com");	
        String response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/div")).getText();
        Assert.assertEquals("",response); 
        //go to registration page
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[6]/small/a[1]")).click(); //click register button
        Thread.sleep(1000);
        //enter valid name
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/input")).sendKeys("john doe");	
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/div")).getText();
        Assert.assertEquals("",response);
        //enter valid email
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[3]/input")).sendKeys("abcd@gmail.com");	
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[3]/div")).getText();
        Assert.assertEquals("",response);
        //enter valid password
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[5]/input")).sendKeys("abcdefgh");	
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[5]/div")).getText();
        Assert.assertEquals("",response);
        
        //enter the same password
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[6]/input")).sendKeys("abcdefgh");	
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[6]/div")).getText();
        Assert.assertEquals("",response);
        
        //back to login
        Thread.sleep(3000);
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[9]/small/a")).click();
        Thread.sleep(1000);
        //admin sign in
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[6]/small/a[3]")).click();
        Thread.sleep(1000);
        //enter valid email
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/input")).sendKeys("abcd@gmail.com");	
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/div")).getText();
        Assert.assertEquals("",response);
        //go to password reset
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[6]/small/a")).click();
        //enter valid email
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/input")).sendKeys("abcd@gmail.com");
        Thread.sleep(1000);
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/div")).getText();
        Assert.assertEquals("",response);
        
        driver.close();
    }
	
	@Test
    public void userLoginAndDashboardCheck() throws InterruptedException {
		/*Login Test
     	*valid email and password pair is entered and check whether login is successful
     	*click menu => click photos and check whether devices are loaded correctly
     	*logout
     	*/
		
		//Test on Opera browser
		//System.setProperty("webdriver.opera.driver","src\\Drivers\\operadriver_win64\\operadriver_win64\\operadriver.exe");
    	//WebDriver driver = new OperaDriver();
        
    	//Test on Chrome browser
    	//System.setProperty("webdriver.chrome.driver","src\\Drivers\\chromedriver_win32\\chromedriver.exe");
    	//WebDriver driver = new ChromeDriver();
    	
    	//Test on edge Browser
    	System.setProperty("webdriver.edge.driver","src\\Drivers\\edgedriver_win64\\msedgedriver.exe");
    	WebDriver driver = new EdgeDriver();
    	
        driver.get(link);
        
        Thread.sleep(5000);
        
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/a[1]")).click(); //click login button
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/input")).sendKeys("esaraimage@hotmail.com");	
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[3]/input")).sendKeys("abc");
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[5]/button")).click();	//click sign in button
        Thread.sleep(10000);
        String response = driver.findElement(By.xpath("/html/body/div/div/div[3]/div/div/div/div[1]/div/h4")).getText();
        Assert.assertEquals("esaraimage@hotmail.com",response);
        
        driver.findElement(By.xpath("/html/body/div/div/div[1]/div[1]/button")).click();
        Thread.sleep(2000);
        driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div[1]/div/div[1]/nav/ul/li[2]")).click();
        Thread.sleep(6000);
        
        response = driver.findElement(By.xpath("/html/body/div/div/div[3]/div/div/div[1]/ul/li[1]")).getText();
        Assert.assertEquals("Device: 11111",response);
        //logout
        driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div[1]/div/div[2]/nav/ul/li")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/div[3]/div/div/div[3]/button[1]")).click();
        Thread.sleep(2000);
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/aside/div/div/div/h1")).getText();
        Assert.assertEquals("Wildlife Tracker",response);	//check whether home page is loaded
        
        driver.close();
        
	}
	
	@Test
    public void userRegisterCheck() throws InterruptedException {
		/*
		 * enter valid details for registration form and submit
		 * check whether API server respond with a success message
		 */
		
		//Test on Opera browser
		//System.setProperty("webdriver.opera.driver","src\\Drivers\\operadriver_win64\\operadriver_win64\\operadriver.exe");
    	//WebDriver driver = new OperaDriver();

    	//Test on Chrome browser
    	//System.setProperty("webdriver.chrome.driver","src\\Drivers\\chromedriver_win32\\chromedriver.exe");
    	//WebDriver driver = new ChromeDriver();
    	
    	//Test on edge Browser
    	System.setProperty("webdriver.edge.driver","src\\Drivers\\edgedriver_win64\\msedgedriver.exe");
    	WebDriver driver = new EdgeDriver();
        
        driver.get(link);
        String email = "abc"+ Math.random() +"@abcd.test";
        Thread.sleep(5000);
        
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/a[2]")).click(); //click get started
        Thread.sleep(1000);
        
        //enter valid name
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/input")).sendKeys("john doe");	
        
        //enter valid email
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[3]/input")).sendKeys(email);	

        //enter phone number
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[4]/div/input")).sendKeys("2345678");	

        //enter valid password
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[5]/input")).sendKeys("abcdefgh");	

        //enter the same password
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[6]/input")).sendKeys("abcdefgh");	
        
        //enter the same password
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[7]/input")).sendKeys("C:\\Users\\ASUS\\Downloads\\istockphoto-937026088-170667a.jpg");
        Thread.sleep(5000);
        //click register button
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[8]/button")).click(); //click get started
        
        //check whether registration complete message is displayed
        Thread.sleep(5000);
        String response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/div/div[4]")).getText();
        Assert.assertEquals("Your data has been sent. It may take 3-5 working days to accept your registration.",response);	//check whether home page is loaded
        
        driver.close();
	}
	
	@Test
    public void adminLoginAndDashboardCheck() throws InterruptedException {
		/*Admin Login Test
     	*enter invalid email and password pair is entered and check whether login is rejected
     	*enter valid email and password pair is entered and check whether login is success
     	*logout
     	*/
		
		//Test on opera browser
		//System.setProperty("webdriver.opera.driver","src\\Drivers\\operadriver_win64\\operadriver_win64\\operadriver.exe");
    	//WebDriver driver = new OperaDriver();
    	
    	//Test on Chrome browser
    	//System.setProperty("webdriver.chrome.driver","src\\Drivers\\chromedriver_win32\\chromedriver.exe");
    	//WebDriver driver = new ChromeDriver();
    	
    	//Test on edge Browser
    	System.setProperty("webdriver.edge.driver","src\\Drivers\\edgedriver_win64\\msedgedriver.exe");
    	WebDriver driver = new EdgeDriver();
        
        driver.get(link);
        
        Thread.sleep(5000);
        
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/a[1]")).click(); //click login button
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[6]/small/a[3]")).click(); //click admin link
        
        Thread.sleep(1000);
        //enter valid email and wrong pw
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/input")).sendKeys("adamadmin123@hotmail.com");	
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[3]/input")).sendKeys("abc123");
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[5]/button")).click();	//click sign in button
        Thread.sleep(5000);
        String response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/div/div[2]")).getText();
        Assert.assertEquals("The username and password incorrecet. Try again.",response);
        
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/div/small/a")).click();	//click login again
        Thread.sleep(2000);
        //enter valid email and correct pw
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/input")).sendKeys("adamadmin123@hotmail.com");	
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[3]/input")).sendKeys("abc");
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[5]/button")).click();	//click sign in button
        Thread.sleep(5000);
        response = driver.findElement(By.xpath("/html/body/div/div/div[3]/div/div/div/div[1]/div/h4")).getText();
        Assert.assertEquals("adamadmin123@hotmail.com",response);
  
        driver.findElement(By.xpath("/html/body/div/div/div[1]/div[1]/button")).click();
        Thread.sleep(6000);
        
        //logout
        driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div[1]/div/div[2]/nav/ul/li")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/div[3]/div/div/div[3]/button[1]")).click();
        Thread.sleep(2000);
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/aside/div/div/div/h1")).getText();
        Assert.assertEquals("Wildlife Tracker",response);	//check whether home page is loaded
        
        driver.close();
        
	}
	
	@Test
    public void passwordRecoveryCheck() throws InterruptedException {
		/*Password recovery
     	*enter invalid email and password pair is entered and check whether password recovery rejected
     	*enter valid email and password pair is entered and check whether password recovery link is sent success
     	*/
		
		//Test on opera browser
		//System.setProperty("webdriver.opera.driver","src\\Drivers\\operadriver_win64\\operadriver_win64\\operadriver.exe");
		//WebDriver driver = new OperaDriver();
		    	
		//Test on Chrome browser
		//System.setProperty("webdriver.chrome.driver","src\\Drivers\\chromedriver_win32\\chromedriver.exe");
		//WebDriver driver = new ChromeDriver();
		
		//Test on edge Browser
		System.setProperty("webdriver.edge.driver","src\\Drivers\\edgedriver_win64\\msedgedriver.exe");
		WebDriver driver = new EdgeDriver();
        
        driver.get(link);
        
        Thread.sleep(5000);
        
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/a[1]")).click(); //click login button
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[6]/small/a[2]")).click(); //click password recovery link
        
        Thread.sleep(1000);
        //enter an email not in the database
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/input")).sendKeys("abc123@abc123.test");	
        
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[3]/button")).click();	//click submit button
        
        
        Thread.sleep(5000);
        String response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/div/div[4]")).getText();
        Assert.assertEquals("The email you entered is not valid!!!",response);
        
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/div/small/a")).click();	//click retry again
        
        Thread.sleep(1000);
        //enter an email not in the database
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[2]/input")).sendKeys("esaraimage@hotmail.com");	
        
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/form/div[3]/button")).click();	//click submit button
        
        Thread.sleep(5000);
        response = driver.findElement(By.xpath("/html/body/div/div/div/div/main/div/div/div/div/div[3]")).getText();
        Assert.assertEquals("The password reset request has been sent. Check your emails to proceed",response);
        
        driver.close();
        
	}
	   
}