import Vue from 'vue';
import moment from 'moment';
import StringUtils from './StringUtils'



Vue.filter("emptyValue", function (value) {
    if (StringUtils.isEmpty(value)) {
        return "";
    } else {
        return value;
    }
});



Vue.filter("statusFilter", function (value) {
    if (value == 1000) {
        return "正常";
    } else if (value == 2000) {
        return "禁用";
    } else if (StringUtils.isEmpty(value)) {
        return "";
    } else {
        return value;
    }
});


Vue.filter("tagToIcon", function (value) {
    if (value == "Java") {
        return "static/img/tag/java.png";
    } else if (value == "Web开发") {
        return "static/img/tag/web.png";
    } else if (value == "NodeJS") {
        return "static/img/tag/nodejs.png";
    } else if (value == "Go语言") {
        return "static/img/tag/golang.png";
    } else if (value == "大数据") {
        return "static/img/tag/hadoop-online.png";
    } else if (value == "Python") {
        return "static/img/tag/python.png";
    } else {
        return "static/img/tag/other.png";
    }
});

Vue.filter("filterTime", function (value) {
    let current = moment().format('YYYY-MM-DD HH:mm:ss');
    let time = moment(value).subtract(-4, "days").format("YYYY-MM-DD HH:mm:ss");
    let currentDv = moment(current) - moment(value);
    let threeDv = moment(time) - moment(value);
    if(currentDv > threeDv){
        return moment(value).format("YYYY-MM-DD");
    }else{
        moment.locale('zh-cn') 
        return moment(value, "YYYY-MM-DD hh:mm:ss").fromNow()
    }
})