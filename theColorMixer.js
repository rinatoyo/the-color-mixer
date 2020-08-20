let firstColor, secondColor, avgColor, invertColor;
let colorObj = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    10: 'A',
    11: 'B',
    12: 'C',
    13: 'D',
    14: 'E',
    15: 'F'
};

function applyColorToDom(domColor1, domColor2, domColor3, domColor4){
    document.getElementById("circle1").style.background = domColor1;
    document.getElementById("circle2").style.background = domColor2;
    document.getElementById("circle3").style.background = domColor3;
    document.getElementById("circle4").style.background = domColor4;
   }


function decode(color1, color2) {
    let r, g, b, firstRgb, secondRgb, rgbToDecimal, avgToDecimal, invertToDecimal;
    let avgRgbArr = [];
    firstRgb = getRGB(color1);
    secondRgb = getRGB(color2);

    r = Math.floor((firstRgb[0] + secondRgb[0]) / 2);
    g = Math.floor((firstRgb[1] + secondRgb[1]) / 2);
    b = Math.floor((firstRgb[2] + secondRgb[2]) / 2);
    avgRgbArr.push(r, g, b);

    avgToDecimal = getInvert(avgRgbArr);

    rgbToDecimal = reverseRgb(avgRgbArr);

    invertToDecimal = reverseRgb(avgToDecimal);

    avgColor = getHex(rgbToDecimal);

    invertColor = getHex(invertToDecimal);
 
    applyColorToDom(firstColor, secondColor, avgColor, invertColor);
    return;
};

function getRGB(hex){
    let rgb = [];
    let red, blue, green;
    let hexNum = hex.toUpperCase().split("");
    if(hexNum[0] === '#'){
        hexNum.shift()
    };
    if(hexNum.length > 6){
        return false;
    };
    for(let i=0; i<hexNum.length; i++){
        if(colorObj.hasOwnProperty(hexNum[i])){
            hexNum[i] = colorObj[hexNum[i]];
        }
    };
    red = (hexNum[0] * 16) + hexNum[1];
    blue = (hexNum[2] * 16) + hexNum[3];
    green = (hexNum[4] * 16) + hexNum[5];
    
    rgb.push(red, blue, green);
    return rgb;
};

function getInvert(newColor){
    let invRgb = [];
    newColor.forEach(value => {
        invRgb.push(255 - value);
    });
    return invRgb;
}

function getHex(newRgb){
    for(let i=0; i<newRgb.length; i++){
      if(colorObj.hasOwnProperty(newRgb[i])){
        newRgb[i] = colorObj[newRgb[i]]
      };
    };
    newRgb.unshift('#');
    let joinedRgb = newRgb.join('');
    return joinedRgb;
  };


function reverseRgb(rgb){
    let idx1, idx2;
    let hexArr = [];
    rgb.forEach(num => {
      idx1 = num / 16;
      idx2 = idx1 - Math.floor(idx1);
      idx2 *= 16
      idx1 = Math.floor(idx1);
      hexArr.push(idx1, idx2);  
    });
    return hexArr;
};


async function fetchHexCode(email) {
    let response = await fetch(`https://ew-color-mixer.herokuapp.com/colors/${email}`);
    let data = await response.json();
    return data;
};

fetchHexCode('rtoyoshiba@gmail.com').then(data => {
    if(data.color1[0] !== '#'){
        firstColor = '#' + data.color1
    }else{
        firstColor = data.color1
    }
    if(data.color2[0] !== '#'){
        secondColor = '#' + data.color2
    }else{
        secondColor = data.color2
    }
    decode(firstColor, secondColor);
}).catch(err => {console.log(err)});

/* decode("#FA8072", "#B0E0E6") */
