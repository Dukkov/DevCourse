// 메인 타이틀 오브젝트
var Title = {
    setColor: function (color) {
        document.querySelector('#headLine a').style.color = color;
    },
    setBorderColor: function (color) {
        document.querySelector('#headLine').style.borderColor = color;
    }
}
// 바디 오브젝트
var Body = {
    setColor: function (color) {
        document.querySelector('body').style.color = color;
    },
    setBackgroundColor: function (color) {
        document.querySelector('body').style.backgroundColor = color;
    }
}
// 메인 메뉴 오브젝트
var Menu = {
    setColor: function (color) {
        var menuList = document.querySelectorAll('#grid a');
        var i = 0;
        while (i < menuList.length) {
            menuList[i].style.color = color;
            i += 1;
        }
    },
    setBorderColor: function (color) {
        document.querySelector('#grid ul').style.borderColor = color;
        document.querySelector('#grid ul').style.color = color;
    }
}
// 다크모드 함수
function darkModeHandler(self) {
    if (self.value === 'Dark') {
        Body.setBackgroundColor('black');
        Body.setColor('white');
        Title.setBorderColor('white');
        Menu.setBorderColor('white');
        Title.setColor('white');
        Menu.setColor('white');
        self.value = 'Light';
    } else {
        Body.setBackgroundColor('white');
        Body.setColor('black');
        Title.setBorderColor('#890F0D');
        Menu.setBorderColor('#E83A14');
        Title.setColor('#630606');
        Menu.setColor('#E83A14');
        self.value = 'Dark';
    }
}