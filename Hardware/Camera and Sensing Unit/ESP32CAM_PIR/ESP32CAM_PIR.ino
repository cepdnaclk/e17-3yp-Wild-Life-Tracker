/********************************************************************************************************************
 *  Board Settings:
 *  Board: "ESP32 Wrover Module"
 *  Upload Speed: "921600"
 *  Flash Frequency: "80MHz"
 *  Flash Mode: "QIO"
 *  Partition Scheme: "Hue APP (3MB No OTA/1MB SPIFFS)"
 *  Core Debug Level: "None"
 *  COM Port: Depends *On Your System*
 *  
 *  GPIO 0 must be connected to GND pin while uploading the sketch
 *  After connecting GPIO 0 to GND pin, press the ESP32 CAM on-board RESET button to put the board in flashing mode
 *********************************************************************************************************************/
 
#include "esp_camera.h"
#include "Arduino.h"
#include "FS.h"                // SD Card ESP32
#include "SD_MMC.h"            // SD Card ESP32
#include "soc/soc.h"           // Disable brownour problems
#include "soc/rtc_cntl_reg.h"  // Disable brownour problems
#include "driver/rtc_io.h"
#include <SerialTransfer.h>


#include <EEPROM.h>            // read and write from flash memory
// define the number of bytes you want to access
#define EEPROM_SIZE 1
 
RTC_DATA_ATTR int bootCount = 0;


#define RESET_PIN 4

//creating the software serial ports(rx,tx)
SoftwareSerial sim(11,10);


// Pin definition for CAMERA_MODEL_AI_THINKER
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

 
int pictureNumber = 0;
SerialTransfer imgTransfer;

//function to send AT commands
byte sendATcommand(byte select, String ATcommand, String answer1, String answer2, unsigned int timeout) {
  byte reply = 1;
  String content = "";
  char character;

  //Serial.println("Hello");
  //Clean the modem input buffer
  while (sim.available() > 0) sim.read();

  //Send the atcommand to the modem
  if (select == 1) {
    sim.println(ATcommand);
  }
  else {
    sim.print(ATcommand);
  }

  delay(100);
  unsigned int timeprevious = millis();
  while ((reply == 1) && ((millis() - timeprevious) < timeout)) {
    while (sim.available() > 0) {
      character = sim.read();
      content.concat(character);
      Serial.print(character);
      delay(10);
    }

    //test
    Serial.println(content);

    //Stop reading conditions
    if (content.indexOf(answer1) != -1) {
      reply = 0;      //if OK
    } else if (content.indexOf(answer2) != -1) {
      reply = 2;      //if ERROR
    } else {
      //Nothing to do...
    }
  }
  
  return reply;
}


//some other functions
int get_network() {
  String buff;
  unsigned int result, index1, index2, Timeout = 0;
  sim.println("AT+CSQ");
  for (unsigned long start = millis(); millis() - start < 2000;) {
    while (sim.available() > 0) {
      buff = sim.readString();
      Timeout = 1;
      break;
    }
  }
  if (Timeout == 0) {
    return 0;
  }
  Serial.println(buff);
  index1 = buff.indexOf("\r");
  buff.remove(0, index1 + 2);
  buff.trim();

  index1 = buff.indexOf(":");
  index2 = buff.indexOf(",");
  buff = buff.substring(index1 + 1, index2);
  buff.trim();
  result = buff.toInt();
  return result;

}

String get_ccid() {
  String buff;
  unsigned int index1, index2, Timeout = 0;
  sim.println("AT+CCID");
  for (unsigned long start = millis(); millis() - start < 2000;) {
    while (sim.available() > 0) {
      buff = sim.readString();
      Timeout = 1;
      break;
    }
  }
  if (Timeout == 0) {
    return "";
  }
  index1 = buff.indexOf("\r");
  buff.replace("\n", "|");
  buff.remove(0, index1 + 2);
  buff.trim();
  index1 = buff.indexOf("|");
  index2 = buff.indexOf("|", index1 + 1);
  String result = buff.substring(index1 + 1, index2);
  result.trim();
  return result;
}



void sim800HTTP(buffer b) {
  // put your setup code here, to run once:
  pinMode(RESET_PIN,OUTPUT);
 
  // start the serial communication with 9600 baud rate
  sim.begin(9600);
  Serial.begin(9600);
  
  delay(5000);

  Serial.println("Starting...");

  byte reply = 0;
  //original
  //byte reply = 1;
  int i = 0;

  //reply = sendATcommand(1, "AT+SAPBR=3,1,\"Contype\",\"GPRS\"", "OK", "ERROR", 1000);
  //Serial.println(reply);
  /*
  while (i < 10 && reply == 1) { //Try 10 times...
    reply = sendATcommand(1, "AT+CREG?", "+CREG: 0,1", "ERROR", 1000);
    i++;
    delay(1000);
  }  
  */

  
  if (reply == 0) {
    reply = sendATcommand(1, "AT+SAPBR=3,1,\"Contype\",\"GPRS\"", "OK", "ERROR", 1000);
    
    if (reply == 0) {
      //change "internet" to "mobitel"
      reply = sendATcommand(1, "AT+SAPBR=3,1,\"APN\",\"mobitel\"", "OK", "ERROR", 1000);
      if (reply == 0) {
        //reply = sendATcommand(1,"AT+SAPBR=3,1,\"USER\",\"entelpcs\"", "OK", "ERROR", 1000);
        if (reply == 0) {
          //reply = sendATcommand(1,"AT+SAPBR=3,1,\"PWD\",\"entelpcs\"", "OK", "ERROR", 1000);
          if (reply == 0) {
            reply = 2;
            i = 0;
            while (i < 3 && reply == 2) { //Try 3 times...
              reply = sendATcommand(1, "AT+SAPBR=1,1", "OK", "ERROR", 10000);
              Serial.println(i);
              if (reply == 2) {
                sendATcommand(1, "AT+SAPBR=0,1", "OK", "ERROR", 10000);
              }
              i++;
            }
            if (reply == 0) {
              reply = sendATcommand(1, "AT+SAPBR=2,1", "OK", "ERROR", 1000);
              
              if (reply == 0) {
                reply = sendATcommand(1, "AT+HTTPINIT", "OK", "ERROR", 1000);
                if (reply == 0) {
                  reply = sendATcommand(1, "AT+HTTPPARA=\"CID\",1", "OK", "ERROR", 1000);
                  if (reply == 0) {
                    reply = sendATcommand(1, "AT+HTTPPARA=\"URL\",\"eoxww579uhgcdqq.m.pipedream.net\"", "OK", "ERROR", 1000);
                    Serial.println(reply);
                    if(reply ==0){
                      reply = sendATcommand(1, "AT+HTTPACTION=1", "OK", "ERROR", 1000);
                    }
                    /*
                    if (reply == 0) {
                      reply = sendATcommand(1, "AT+FTPUN=\"root\"", "OK", "ERROR", 1000);
                      if (reply == 0) {
                        reply = sendATcommand(1, "AT+FTPPW=\"IVQko1TU\"", "OK", "ERROR", 1000);
                        if (reply == 0) {
                          reply = sendATcommand(1, "AT+FTPPUTNAME=\"" + String(file_Name) + ".jpg\"", "OK", "ERROR", 1000);
                          if (reply == 0) {
                            reply = sendATcommand(1, "AT+FTPPUTPATH=\"/rilevazioni/\"", "OK", "ERROR", 1000);
                            if (reply == 0) {
                              unsigned int ptime = millis();
                              reply = sendATcommand(1, "AT+FTPPUT=1", "+FTPPUT: 1,1", "+FTPPUT: 1,6", 60000);
                              Serial.println("Time: " + String(millis() - ptime));
                              if (reply == 0) {
                                int i = 0;
                                String Encode;
                                for (size_t n = 0; n < fb->len; n++) {
                                  char_buffer = fb->buf[n];
                                  string_buffer.concat(char_buffer);
                                  i++;
                                  if (i == buffer_space) {
                                    sendATcommand(1, "AT+FTPPUT=2," + String(buffer_space), "AT+FTPPUT=2,10", "ERROR", 1000);
                                    sendATcommand(0, string_buffer, "OK", "ERROR", 5000);
                                    string_buffer = "";
                                    i = 0;
                                  }
                                }
                                if (string_buffer != "") {
                                  sendATcommand(1, "AT+FTPPUT=2," + String(i), "AT+FTPPUT=2,10", "ERROR", 1000);
                                  sendATcommand(0, string_buffer, "OK", "ERROR", 5000);
                                  sendATcommand(1, "AT+FTPPUT=2,0", "OK", "ERROR", 1000);
                                  EEPROM.write(0, pictureNumber);
                                  EEPROM.commit();
                                  digitalWrite(flashLight, 1);
                                  delay(50);
                                  digitalWrite(flashLight, 0);
                                  delay(200);
                                  digitalWrite(flashLight, 1);
                                  delay(50);
                                  digitalWrite(flashLight, 0);
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    */
                  }
                }
              }
              
            }
          }
        }
      }
    }
    
  }



void setup() {
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0); //disable brownout detector
  Serial.begin(115200);
  //Serial1.begin(115200);

  imgTransfer.begin(Serial);

  Serial.setDebugOutput(true);
 
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  
  pinMode(4, INPUT);
  
  digitalWrite(4, LOW);
  rtc_gpio_hold_dis(GPIO_NUM_4);
 
  if(psramFound()){
    config.frame_size = FRAMESIZE_VGA; // FRAMESIZE_ + QVGA|CIF|VGA|SVGA|XGA|SXGA|UXGA
    config.jpeg_quality = 10;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }
 
  // Init Camera
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    
    Serial.printf("Camera init failed with error 0x%x", err);
    
    return;
  }

   //set the camera parameters
  sensor_t * s = esp_camera_sensor_get();
  s->set_contrast(s, 2);    //min=-2, max=2
  s->set_brightness(s, 2);  //min=-2, max=2
  s->set_saturation(s, 2);  //min=-2, max=2
  delay(100);               //wait a little for settings to take effect
 
  Serial.println("Starting SD Card");
 
  delay(500);
  if(!SD_MMC.begin()){
    Serial.println("SD Card Mount Failed");
    //return;
  }
 
  uint8_t cardType = SD_MMC.cardType();
  if(cardType == CARD_NONE){
    Serial.println("No SD Card attached");
    return;
  }
   
  camera_fb_t * fb = NULL;
 
  // Take Picture with Camera
  fb = esp_camera_fb_get();  
  if(!fb) {
    Serial.println("Camera capture failed");
    Serial.println("Exiting now"); 
    while(1);   //wait here as something is not right
  }
  
  // initialize EEPROM with predefined size
  EEPROM.begin(EEPROM_SIZE);
  pictureNumber = EEPROM.read(0) + 1;
 
  // Path where new picture will be saved in SD Card
  String path = "/picture" + String(pictureNumber) +".jpg";  
  
  
  fs::FS &fs = SD_MMC;

  //create new file
  File file = fs.open(path.c_str(), FILE_WRITE);
  if(!file){
    Serial.println("Failed to open file in writing mode");
    Serial.println("Exiting now"); 
    while(1);   //wait here as something is not right
  }
  else {
    file.write(fb->buf, fb->len); // payload (image), payload length
    Serial.printf("Saved file to path: %s\n", path.c_str());
    EEPROM.write(0, pictureNumber);
    EEPROM.commit();
  }
  file.close();
  
  delay(500);
  
  sendFile(fb,path);
    
  // Turns off the ESP32-CAM white on-board LED (flash) connected to GPIO 4
  pinMode(4, OUTPUT);  //GPIO for LED flash
  digitalWrite(4, LOW);  //turn OFF flash LED
  rtc_gpio_hold_en(GPIO_NUM_4);  //make sure flash is held LOW in sleep

  delay(200);
  
  esp_camera_fb_return(fb);

  esp_sleep_enable_ext0_wakeup(GPIO_NUM_13, 0);
 
  Serial.println("Going to sleep now");
  delay(3000);
  esp_deep_sleep_start();
} 
 
void loop() {
  
}

void sendFile(camera_fb_t * fb,String name){
  imgTransfer.sendDatum(name);
  
  uint16_t numPackets = fb->len / (MAX_PACKET_SIZE - 2); // Reserve two bytes for current file index
  
  if (fb->len  % MAX_PACKET_SIZE) // Add an extra transmission if needed
    numPackets++;
  
  for (uint16_t i=0; i<numPackets; i++) // Send all data within the file across multiple packets
  {
    uint16_t fileIndex = i * MAX_PACKET_SIZE; // Determine the current file index
    uint8_t dataLen = MAX_PACKET_SIZE - 2;

    if ((fileIndex + (MAX_PACKET_SIZE - 2)) > fb->len) // Determine data length for the last packet if file length is not an exact multiple of MAX_PACKET_SIZE-2
      dataLen = fb->len - fileIndex;
    
    uint8_t sendSize = imgTransfer.txObj(fileIndex); // Stuff the current file index

    //send file
    sim800HTTP(buffer imgTransfer);

    sendSize = imgTransfer.txObj(fb->buf[fileIndex], sendSize, dataLen); // Stuff the current file data
    
    imgTransfer.sendData(sendSize, 1); // Send the current file index and data
    delay(100);
  }
  Serial.printf("\nTransfer Finished\n");
  delay(10000);
  
}



//sim800HTTP
