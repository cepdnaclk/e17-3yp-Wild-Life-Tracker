#include <SoftwareSerial.h>   //to have software tx,rx
#define RESET_PIN 4

//creating the software serial ports(rx,tx)
SoftwareSerial sim(11,10);

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



void sim800HTTP() {
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

  