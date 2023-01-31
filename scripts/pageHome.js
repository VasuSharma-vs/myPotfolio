let navBarChecker = true;
let delayTime = 0;
let helloText = [];
let removeDivs = [];
let changedTextDict = {};
let textAdded = false;
let written = false;
const options = ["Home", "About me", "Skills", "Projects", "Contact me"];
const screenHeight = window.screen.availHeight;
const screenWidth = window.screen.availWidth;
var navigationbar = false;
var siteOpen = false;
let currOpenshelf = "";
let currOpenBox = "";

function device(returnType="s", coma=true) {

  if (returnType === "s") {
    if (window.screen.availHeight > window.screen.availWidth) {
      return "-m";
    } else {
      return "-d";
    }
  } else if (returnType === "L") {
    if (window.screen.availHeight > window.screen.availWidth) {
      if (coma === true) {
        return [",-m","-d"];
      } else {
        return ["-m","-d"];
      }
    } else {
      if (coma === true) {
        return [",-d", "-m"];
      } else {
        return["-d", "-m"];
      }
    }
  } else if (returnType === "n") {
    return "";
  }

}

CssDivs = {

  irritate: function (dict, funs=null, info=null) {

    for (var i = 0; i<dict.length; i++) {
      funs(dict[i], info)
    }
  },

  bodyLayout: function (type) {
    return {"#body": ["bodyfont"+device(type)]};
  },

  Navbar: function (type) {

    return {"#nav-div": ["NavBar-active"+device(type)],
             "#NameLogo": ["Name-active"+device(type)],
             "#navBar": ["NavBox-active"+device(type)],
             "#remove01": ["NavBox-deactive"],
             ".blockBox": ["blockBox-open"]}

  },

  NavbarLayout: function (type) {
    return {"#Name-btn": ["theam-btn1"+device(type)],
            ".nav-item": ["theam-btn2"+device(type)],}
  },

  blockbox: {
    blocks: ["#block01", "#block02", "#block03", "#block04", "#block05"],
    shelf: function (type) {
      return {".shelf": [" "+device(type)]};
    },
    activateShelf: function (id, boxName="Blackbox", forceActivation= false) {

      if (id !== currOpenshelf) {

        CssDivs.irritate(this.blocks, function (id, info) {

        if (id === info[0]) {
         addjustinglayout({ [id] : ["activeShelf"+device("L")]});
         CssDivs.boxes.activatebox([id, info[1]]);
        } else {
          $(id).removeClass("activeShelf"+device());
          CssDivs.boxes.activatebox([id, "Namebox"]);
        }}, [id, boxName]);
        currOpenshelf = id;

       }
      else if (forceActivation === true) {
         addjustinglayout({ [id] : ["activeShelf"+device("L")]});
         CssDivs.boxes.activatebox([id, boxName]);
       }
    }
  },

  shelfLayout: function (type) {
    return {".namebox-h1": ["h1"+device(type)],
            "#namasteImg": ["img"+device(type)],
            ".h1-f": ["font-size"+device(type)]}
  },

  boxes: {
          activatebox: function (info) {
      CssDivs.irritate(this.boxesList, function (boxName, data) {

        className = CssDivs.boxes[boxName]("L")["."+boxName];
        if (data[1] === boxName) {

          addjustinglayout({ [data[0] + " ."+ boxName] : className}, "a");
        } else {

          addjustinglayout({ [data[0] + " ."+ boxName] : className}, "r");
        }}, info);

  },
          boxesList: ["Namebox", "Blackbox", "Whitebox"],
          Namebox: function (type) {
            return {".Namebox": ["active-namebox"+device(type)]};
          },
          Blackbox: function (type) {
            return {".Blackbox": ["activebox"+device(type)]};
          },
          Whitebox: function (type) {
            return {".Whitebox": ["activebox"+device(type)]};
          }}};

function pause(funs, till, addTime=true, info=null) {

  function timeM () {

    if (addTime === true) {
      delayTime += till;
      return delayTime;
    }
    else {
      return delayTime+till;
    }
  }

  if (info === null) {
    setTimeout(funs, timeM());
  }
  else {
    setTimeout(funs, timeM(), info);
  }
};

function textRemover(id) {

  let textLength = null;
  let timeTaken = 0;

  if (typeof changedTextDict[id] !== "undefined") {
    textLength = changedTextDict[id].length;
  }
  else {
    textLength = $(id)[0].innerText.length  ;
  }

  function removeLrtter() {
    $(id)[0].innerText = $(id)[0].innerText.substring(1);
  }

  for (var i = 0; i<textLength; i++) {
    timeTaken = i*100;
    pause(removeLrtter, timeTaken, false);
  }
  delayTime += timeTaken;
  }

function textAdder(info) {

  const id = info[0];
  let texts = info[1].split(" ");
  const textsL = texts.length;


  let counter = textsL;
  var timetaken2 = 0;

  for (var x = 0; x < textsL; x++) {
    let text = texts[x];
    const textL = text.length;
    let counter2 = textL;

    for (var i = 0; i<textL; i++) {
      timetaken2 += 100;
      pause(function () {
        $(id)[0].innerText += text[0];
        if (counter2 === 1 && counter !== 1) {
          $(id)[0].innerText += "\xa0";
          counter -= 1;
        }
        text = text.substring(1);
        counter2 -=1},timetaken2, false);
    }
  }
  changedTextDict[id] = info[1];
  delayTime += timetaken2;
}

function addC(id, info) {
  for (var i = 0; i<info.length; i++) {
    mainInfo = info[i];
    $(id).addClass(mainInfo);
  }

}

function removeC(id, info) {
  for (var i = 0; i<info.length; i++) {
    mainInfo = info[i];
    $(id).removeClass(mainInfo);
  }

}

function addcss(id, info) {
  for (var i = 0; i<info.length; i++){
    mainInfo = info[i];
    console.log(id, mainInfo, delayTime);
    $(id).css(mainInfo[0], mainInfo[1]);
  }

}

function removeDiv(id) {
  $(id).remove();
}

function appendClass(data) {

  const taskList = Object.values(data);

  for (item in data) {
    switch (item.slice(0, -2)) {
      case "remove":
        removeDiv(data[item]);
        break;

        case "class":
          for (x in data[item]) {
            if (item.slice(-2) === " a") {
              addC(x, data[item][x]);
            } else {
              removeC(x, data[item][x]);
            }
          }
          break;

        case "css":
          for (x in data[item]) {
            addcss(x, data[item][x]);
          }
          break;
      default:
      }
    }
  }

function activateNavbar() {

  delayTime = 0;

  if (navigationbar === false) {

    var data = {"class a": CssDivs.Navbar("s")};

    appendClass(data);

    helloText.push($("#re")[0].innerText);
    helloText.push($("#re1")[0].innerText);

    textRemover("#re");
    textRemover("#re1");

    pause(appendClass, 1000, true, {"class r": {"#navBar": ["hidden"]}});

    navigationbar = true;

    } else {
    var data = {"class r": CssDivs.Navbar("s"),
                "class a": {"#navBar": ["hidden"]}};

    appendClass(data);

    pause(textAdder, 00, true, ["#re", helloText[0]]);
    pause(textAdder,  00, true, ["#re1", helloText[1]]);

    helloText = [];

    navigationbar = false;

  }
}

function openMainbox(id, secId) {

  if (id === secId) {

  }

}

function addjustinglayout(data, task= "a") {

  ids = Object.keys(data);

  for (var i=0; i<ids.length; i++) {
    idClassName = ids[i];
    classes = data[idClassName];
    for (var x=0; x<classes.length; x++) {
        theclass = classes[x].split(",");

        if (task === "a") {

          $(idClassName).addClass(theclass[0]+theclass[1]);
        } else if (task === "r") {

          $(idClassName).removeClass(theclass[0]+theclass[1]);
        }
        $(idClassName).removeClass(theclass[0]+theclass[2]);
    }
  }

}

$(window).resize(function () {
  addjustinglayout(CssDivs.bodyLayout("L"));
  addjustinglayout(CssDivs.Navbar("L"));
  addjustinglayout(CssDivs.NavbarLayout("L"));
  addjustinglayout(CssDivs.shelfLayout("L"));
  addjustinglayout(CssDivs.blockbox.shelf("L"));
  addjustinglayout(CssDivs.boxes.Namebox("L"));

  CssDivs.blockbox.activateShelf(currOpenshelf, currOpenBox, true);

  deviceList = device("L", false);
  //$(currOpenshelf).removeClass("activeShelf"+deviceList[1]);
  //$(currOpenshelf).addClass("activeShelf"+deviceList[0]);
  //$(currOpenshelf + " ." + currOpenBox).removeClass("activebox"+deviceList[1]);
  //$(currOpenshelf + " ." + currOpenBox).addClass("activebox"+deviceList[0]);
})

addjustinglayout(CssDivs.bodyLayout("L"));
addjustinglayout(CssDivs.NavbarLayout("L"));
addjustinglayout(CssDivs.shelfLayout("L"));

$("#Name-btn").click(function () {

    if (navBarChecker === true) {

      activateNavbar();
      setTimeout(appendClass, 2000, {"class a": CssDivs.blockbox.shelf("s")});

      navBarChecker = false;
    }
    else if (navBarChecker === false) {

      activateNavbar();
      appendClass({"class r": CssDivs.blockbox.shelf("s")});
      navBarChecker = true;
    }

    else {

      alert("error has found in wepsite.");
    }

  });

$(".shelf").click(function () {

  id = "#"+$(this).attr("id");

  if (id !== currOpenshelf) {
    CssDivs.blockbox.activateShelf(id);
    currOpenBox = "Blackbox";
  }

  });

$("#greetings").click(function () {

  if (currOpenBox !== "Whitebox") {
    CssDivs.boxes.activatebox(["#block03", "Whitebox"]);
    currOpenBox = "Whitebox";

  if (!textAdded) {
    var texts = ["I am a shelf-tought 3D Artist,",
                 "Front-end developer.",
                 "Also Back-end is in progress." ];

    delayTime = 0;
    for (var i=0; i<texts.length; i++) {

      classId = ".textbox"+ (i+1);
      var text =  texts[i];

      pause(textAdder, 500, true, [classId, text]);
    }
      textAdded = true;
  }


  }

});

$(".Whitebox").click(function functionName() {

  CssDivs.boxes.activatebox([currOpenshelf, "Blackbox"]);
  currOpenBox = "Blackbox";

});

$("#block01").click(function () {

  delayTime = 0;

  info = ["Companies looking forwerd to work with.",
          "As a fullstack wep developer"];

  if (!written) {

    for (let a = 0; a < info.length; a += 1) {
      var classId2 = "#hl" + (a+1);
      infoText = info[a];
        pause(textAdder, 0, true, [classId2, infoText]);
      }

    pause(function () {

    },3000, true, info)
    written = true;
  }

  pause(function () {
    $(".conp-icons").addClass("comp-active");
  }, 2000);

});

$(".nav-item").click(function () {

  if (window.screen.availHeight > window.screen.availWidth) {

    for (var i=1; i<=5; i++) {
        $("#block0"+ i.toString()).removeClass("activeShelf-m");
        $("#block0"+ i.toString()).removeClass("activeShelf-d");
        $("#block0"+ i.toString()+" .Whitebox").removeClass("activebox");
        $("#block0"+ i.toString()+" .namebox").removeClass("activebox");
        $("#block0"+ i.toString()+" .Blackbox").removeClass("activebox");
      }
  $(this).removeClass("theam-btn2-m");
  $(this).addClass("theam-btn2");
  }
});

//var data2 = [["#greetings", "click here"], ["#greetings", "Namaste"]];
//let greet = $("#greetings")[0].innerText;

//function changeText(info) {
//  pause(textRemover, 100, true, info[0]);
//  pause(textAdder, 100, true, info);
//}

//for (var i = 0; i<data2.length; i++) {

  //pt = i * 2000;

  //pause(changeText, pt, true, data2[i]);}
