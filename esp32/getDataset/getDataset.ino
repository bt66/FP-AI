#include "WiFi.h"
#include <HTTPClient.h>

const char* ssid = "bt66_1";
const char* password = "2wsx1qaz";
const int temperaturePin = 32;
const int humidityPin = 33;
unsigned long timerDelay = 1000;
unsigned long LastTime = 0;

String datasetAPI ="https://fp-ai.tukutahu.tk/insertData";


HTTPClient http;


void setup() {
  Serial.begin(115200);
 
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
 
  Serial.println("Connected to the WiFi network");
  Serial.println(WiFi.localIP());
}

void loop() {
  if ((millis() - LastTime > timerDelay)) {
    if(WiFi.status() == WL_CONNECTED){
      http.begin(datasetAPI.c_str());
      http.addHeader("Content-Type", "application/json");
      String temperature = String(analogRead(temperaturePin));
      String humidity = String(analogRead(humidityPin));
      String reqBody = "{\"deviceId\":\"esp32-3\",\"tempereture\":"+ temperature +",\"humidity\":"+ humidity +"}";
      Serial.println("-----------------------------");
      Serial.println(reqBody);
      int httpResponseCode = http.POST(reqBody);

      if (httpResponseCode == 200) {
        Serial.print("HTTP response code: ");
        Serial.println(httpResponseCode);
      }
      else {
        Serial.print("Error post data code: ");
        Serial.println(httpResponseCode);
        Serial.println(http.getString());
      }
      http.end();
    }else {
      WiFi.reconnect();
    }
    LastTime = millis();
  }
}