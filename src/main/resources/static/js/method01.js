//****************针对第一种方式的具体js实现部分******************//
//****************所使用的数据是city.js******************//

/*根据id获取对象*/
// function $(str) {
//     return document.getElementById(str);
// }
var addrShow = document.getElementById('addr-show');
var btn = document.getElementsByClassName('met1')[0];
var prov = document.getElementById('prov');
var city = document.getElementById('city');
var country = document.getElementById('country');


/*用于保存当前所选的省市区*/
var current = {
    prov: '',
    city: '',
    country: ''
};

/*自动加载省份列表*/
(function showProv() {
    btn.disabled = true;
    var len = provice.length;
    for (var i = 0; i < len; i++) {
        var provOpt = document.createElement('option');
        provOpt.innerText = provice[i]['name'];
        provOpt.value = i;
        prov.appendChild(provOpt);
    }
})();

/*根据所选的省份来显示城市列表*/
function showCity(obj) {
    $('#city').children().remove('option');
    $("#city").append("<option>请选择城市</option>");
    $('#country').children().remove('option');
    $("#country").append("<option>请选择县/区</option>");
    var val = obj.options[obj.selectedIndex].value;
    if (val != current.prov) {
        current.prov = val;
        addrShow.value = '';
        btn.disabled = true;
    }
    //console.log(val);
    if (val != null) {
        city.length = 1;
        var cityLen = provice[val]["city"].length;
        for (var j = 0; j < cityLen; j++) {
            var cityOpt = document.createElement('option');
            cityOpt.innerText = provice[val]["city"][j].name;
            cityOpt.value = j;
            city.appendChild(cityOpt);
        }
    }
}

/*根据所选的城市来显示县区列表*/
function showCountry(obj) {
    var val = obj.options[obj.selectedIndex].value;
    current.city = val;
    if (val != null) {
        country.length = 1; //清空之前的内容只留第一个默认选项
        var countryLen = provice[current.prov]["city"][val].districtAndCounty.length;
        if(countryLen == 0){
            addrShow.value = provice[current.prov].name + '-' + provice[current.prov]["city"][current.city].name;
            return;
        }
        for (var n = 0; n < countryLen; n++) {
            var countryOpt = document.createElement('option');
            countryOpt.innerText = provice[current.prov]["city"][val].districtAndCounty[n];
            countryOpt.value = n;
            country.appendChild(countryOpt);
        }
    }
}

/*选择县区之后的处理函数*/
function selecCountry(obj) {
    current.country = obj.options[obj.selectedIndex].value;
    if ((current.city != null) && (current.country != null)) {
        btn.disabled = false;
    }
}

/*点击确定按钮显示用户所选的地址*/
function showAddr() {
    addrShow.value = provice[current.prov].name + '-' + provice[current.prov]["city"][current.city].name + '-' + provice[current.prov]["city"][current.city].districtAndCounty[current.country];
    return addrShow.value;
}

//**********************************************************************************************************//

var c_addrShow = document.getElementById('c_addr-show');
var c_btn = document.getElementsByClassName('met2')[0];
var c_prov = document.getElementById('c_prov');
var c_city = document.getElementById('c_city');
var c_country = document.getElementById('c_country');


/*用于保存当前所选的省市区*/
var c_current = {
    c_prov: '',
    c_city: '',
    c_country: ''
};

/*自动加载省份列表*/
(function c_showprov() {
    c_btn.disabled = true;
    var len = provice.length;
    for (var i = 0; i < len; i++) {
        var provOpt = document.createElement('option');
        provOpt.innerText = provice[i]['name'];
        provOpt.value = i;
        c_prov.appendChild(provOpt);
    }
})();

/*根据所选的省份来显示城市列表*/
function c_showCity(obj) {
    $('#c_city').children().remove('option');
    $("#c_city").append("<option>请选择城市</option>");
    $('#c_country').children().remove('option');
    $("#c_country").append("<option>请选择县/区</option>");
    var val = obj.options[obj.selectedIndex].value;
    if (val != current.prov) {
        c_current.prov = val;
        c_addrShow.value = '';
        c_btn.disabled = true;
    }
    //console.log(val);
    if (val != null) {
        c_city.length = 1;
        var cityLen = provice[val]["city"].length;
        for (var j = 0; j < cityLen; j++) {
            var cityOpt = document.createElement('option');
            cityOpt.innerText = provice[val]["city"][j].name;
            cityOpt.value = j;
            c_city.appendChild(cityOpt);
        }
    }
}

/*根据所选的城市来显示县区列表*/
function c_showCountry(obj) {
    var val = obj.options[obj.selectedIndex].value;
    c_current.city = val;
    if (val != null) {
        c_country.length = 1; //清空之前的内容只留第一个默认选项
        var countryLen = provice[c_current.prov]["city"][val].districtAndCounty.length;
        if(countryLen == 0){
            c_addrShow.value = provice[c_current.prov].name + '-' + provice[c_current.prov]["city"][c_current.city].name;
            return;
        }
        for (var n = 0; n < countryLen; n++) {
            var countryOpt = document.createElement('option');
            countryOpt.innerText = provice[c_current.prov]["city"][val].districtAndCounty[n];
            countryOpt.value = n;
            c_country.appendChild(countryOpt);
        }
    }
}

/*选择县区之后的处理函数*/
function c_selecCountry(obj) {
    c_current.country = obj.options[obj.selectedIndex].value;
    if ((c_current.city != null) && (c_current.country != null)) {
        c_btn.disabled = false;
    }
}

/*点击确定按钮显示用户所选的地址*/
function c_showAddr() {
    c_addrShow.value = provice[c_current.prov].name + '-' + provice[c_current.prov]["city"][c_current.city].name + '-' + provice[c_current.prov]["city"][c_current.city].districtAndCounty[c_current.country];
    return c_addrShow.value;
}