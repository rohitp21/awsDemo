
import React, { Component } from 'react'
import ReactDOM from "react-dom";
import Modal2 from "../layout/popups/Modal"
export default class UtilClass {
      toTitleCase(str) { return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }); }
      toLowerCase(str) { return str.replace(/\w\S*/g, function (txt) { return txt.toLowerCase() }); }
      toUpperCase(str) { return str.replace(/\w\S*/g, function (txt) { return txt.toUpperCase() }); }
      sanitizeDate = async (dateObj) => {
            var newDate = undefined;
            var d1 = dateObj.getDate();
            var m1 = dateObj.getMonth() + 1; //months from 1-12
            var y1 = dateObj.getFullYear();
            newDate = y1 + "-" + m1 + "-" + d1;
            return newDate;
      }
      sanitizeStartDateToISOString = async (dateObj) => {
            var newDate = undefined;
            var d1 = dateObj.getDate();
            var m1 = dateObj.getMonth() + 1; //months from 1-12
            var y1 = dateObj.getFullYear();
            newDate = y1 + "-" + m1 + "-" + d1;
            return newDate+"T00:00:00";
      }
      sanitizeEndDateToISOString = async (dateObj) => {
            var newDate = undefined;
            var d1 = dateObj.getDate();
            var m1 = dateObj.getMonth() + 1; //months from 1-12
            var y1 = dateObj.getFullYear();
            newDate = y1 + "-" + m1 + "-" + d1;
            return newDate+"T23:59:59.999999";
      }
      check_cookie_name(name) {
            var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            if (match) {
                  console.log(match[2]);
                  return match[2]
            }
            else {
                  console.log('--something went wrong---');
                  return null
            }
      }

      //form validaton
      toggleHeight = (event) => {
            let target = event.target.parentElement.parentElement;
            if (target && target.classList.contains('heightAuto')) {
                  target.classList.remove('heightAuto')
            } else if (target && !target.classList.contains('heightAuto')) {
                  target.classList.add('heightAuto')
            }
      }

      random_color = (format) => {
            var rint = Math.floor(0x100000000 * Math.random());
            switch (format) {
                  case 'hex':
                        let color = '#' + ('00000' + rint.toString(16)).slice(-6).toUpperCase();
                        if (color === "#ffffff") {
                              this.random_color("hex");
                        }
                        return color
                  case 'hexa':
                        return '#' + ('0000000' + rint.toString(16)).slice(-8).toUpperCase();
                  case 'rgb':
                        return 'rgb(' + (rint & 255) + ',' + (rint >> 8 & 255) + ',' + (rint >> 16 & 255) + ')';
                  case 'rgba':
                        return 'rgba(' + (rint & 255) + ',' + (rint >> 8 & 255) + ',' + (rint >> 16 & 255) + ',' + (rint >> 24 & 255) / 255 + ')';
                  default:
                        return rint;
            }
      }
      toggleButtonGroups = (target) => {
            var sibArray = undefined;
            var chartArray = undefined;
            if (target) {
                  chartArray = document.querySelectorAll('.tabContentDiv .chartContainer')
                  if (chartArray) {
                        for (let index = 0; index < chartArray.length; index++) {
                              if (!chartArray[index].classList.contains('customHidden')) {
                                    chartArray[index].classList.add('customHidden');
                              }
                        }
                  }

                  sibArray = target.parentElement.children
                  if (sibArray) {
                        for (let index = 0; index < sibArray.length; index++) {
                              if (sibArray[index].classList.contains('active')) {
                                    sibArray[index].classList.remove('active');
                              }
                              if (target === sibArray[index]) {
                                    chartArray[index].classList.remove('customHidden');
                              }
                        }
                  }

                  target.classList.add('active')
            }
      }
      showSelectedAccDropdown(target) {
            let selcAccText = document.getElementById('selcAccText');
            if (selcAccText) {
                  let selcAccIcon = document.getElementById('selcAccIcon');
                  if (selcAccIcon) {
                        selcAccIcon.remove()
                  }
                  selcAccText.innerHTML = target.innerHTML
            }
      }
      convertNum = (n) => {
            n = String(n)
            if (n.length === 1) {
                  n = '0' + n
            }
            return n
      }
      showAlert = (heading,content,type,data) => {
            const container = document.createElement("div");
            ReactDOM.render(<Modal2 heading={heading} type={type} content={content} data ={data}/>, container);
      }

}
