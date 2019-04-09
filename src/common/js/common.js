
import axios from 'axios';        //引入axios请求
let isNum=function(str){
  if(/^[+-]?\d*\.?\d*$/.test(str)){
      //为数字
      return true;
  }else{
      return false;
  }
}
let getIndustrialGroup=function (callback){// 产业集团
      axios({
        method:'post',
        url:'/budget-bus-web/com/authDropDown/getAuthOrgIndustrialGroupList',
      }).then((response_Industrial)=>{
        if(response_Industrial.data.code==10){
          callback(response_Industrial.data.data);
        }
        else{
          console.log(response_Industrial.data.message);
          // callback(response_Industrial.data.data);
        }
      }).catch((response_Industrial)=>{
          console.log(response_Industrial.data);
      })
    },
    getCity=function(industrial_group_code,callback){
      axios({
        method:'post',
        url:'/budget-bus-web/com/authDropDown/getAuthAreaDropDownList',
        params:{
          industrial_group_code:industrial_group_code
        }
      }).then((response_city)=>{
        if(response_city.data.code==10){
          callback(response_city.data.data);
        }
        else{
          console.log(response_city.data.message);
        }
      }).catch((response_city)=>{
        console.log('城市catch');
      })
    },
    getPartition=function(area_code,callback,empty){
            let params={ area_code:area_code};
            if(empty=="empty"){
              params.empty='empty';
            }
            axios({
                method:'post',
                url:'/budget-bus-web/com/authDropDown/getAuthCommonOrgPartitionList',
                params:params
            }).then((response_partition)=>{
              if(response_partition.data.code==10){
                callback(response_partition.data.data);
              }
              else{
                console.log(response_partition.data.message);
              }
            }).catch((response_partition)=>{
                console.log('服务站catch');
            })
    },
    getPage=function(industrial_group_code,area_code,type,callback){
      axios({
      method:'post',
      url:'/budget-bus-web/com/authDropDown/getConfigAuthPageGroupDropDown',
      params:{
              industrial_group_code:industrial_group_code,
              area_code:area_code,
              type:type
      }
      }).then((response_page)=>{

      if(response_page.data.code==10){
        callback(response_page.data.data);
      }
      else{
          console.log(response_page.data.message);

      }
      }).catch((response)=>{
        alert('页面角色获取catch');
      })
    },
    getMember=function(industrial_group_code,callback){
      axios({
      method:'post',
      url:'/budget-bus-web/com/authDropDown/getMemberInfoList',
      params:{
              industrial_group_code:industrial_group_code
      }
      }).then((response_member)=>{
      if(response_member.data.code==10){
        callback(response_member.data.data);
        //  console.log(this.options_member);
      }
      else{
          console.log(response_member.data.message);
      }
      }).catch((response)=>{
        alert('人员报错catch');
      })
    },
    axiosPackage=function(url,params,callback){

      // axios.post(url, params)
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });

      axios({
        method: 'post',
        url: url,
        data: params,
        transformRequest: [function (data) {
          // Do whatever you want to transform the data
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response_member)=>{
        callback(response_member.data);
        }).catch((response)=>{
          if(localStorage.getItem('login_guoqi')!='登录过期，请重新登录')
             console.log(url+'---catch');
          callback(response.data);
          // this.$store.state.pointerNone=false;
      })
    },
    getNumber=function(num){
      if(isNaN(Number(num))){
        return 0;
      }else{
        return Number(num);
      }
    },
    getReport=function(para,info){
      let isReport=false;
      let reportInfo={};
      $.ajax({
        type: 'post',
        url: '/budget-bus-web/com/report/getReportInfo',
        async:false,
        data:para,
        dataType:'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("SY-TOKEN", localStorage.getItem('token'));
        },
        success:function (data2) {
          if(data2.data!=null&&data2.data.reported_status==20){
            isReport=true;
          }
          reportInfo=data2.data;
        },
        error:function (err) {
            console.log(err);
        }
      })
      return info!=undefined?reportInfo:isReport;
    },
    getDate_http=function(){
      let date=new Date();
      $.ajax({
        type: 'post',
        url:"/budget-bus-web/com/utils/getDateUtils",
        async:false,
        dataType:'json',
        beforeSend: function (xhr) {
          xhr.setRequestHeader("SY-TOKEN", localStorage.getItem('token'));
        },
        success:function (data2) {
          date=new Date(data2.data);
        },
        error:function (err) {
          console.log(err);
        }
      })
       return date;     //获取请求头中的date
    },
    removeRurrent=function(){
      $('thead').on('click',function(){
          $('tr').removeClass('current-row');
      });
    },
          //选中行标记固定住的
    currentRow_fixed=function(index){
      $('.el-table__fixed-body-wrapper table tr').removeClass('current-row');
      $('.el-table__fixed-body-wrapper table tr').eq(index).addClass('current-row');
    },
           //选中行标记不固定住的
    currentRow=function(index){
            $('.el-table__body-wrapper table tr').removeClass('current-row');
            $('.el-table__body-wrapper table tr').eq(index).addClass('current-row');
      },
    //power角色去重
    powerPage=function(arr,index){
      let ok=true;
      let len=arr.length;
      for(let i=0;i<len;i++){
        if(index!=i&&arr[index].page_group_describe==arr[i].page_group_describe){
            ok=false;
            break;
        }
      }
      return ok;
    },
    getKpi_formula_num=function(item2){
      // kpi_formula_num实数
      var kpi_formula_numList=[];
      if(isNum(item2.kpi_formula_code)){
        kpi_formula_numList.push(0);
      }
      if(item2.kpi_formula_open_row_status==20){
        if(isNum(item2.kpi_formula_last_month_code)){
          kpi_formula_numList.push(-6);
        }
        if(isNum(item2.kpi_formula_last_this_month_code)){
          kpi_formula_numList.push(-5);
        }
        if(isNum(item2.kpi_formula_month01_code)){
          kpi_formula_numList.push(1);
        }
        if(isNum(item2.kpi_formula_month02_code)){
          kpi_formula_numList.push(2);
        }
        if(isNum(item2.kpi_formula_month03_code)){
          kpi_formula_numList.push(3);
        }
        if(isNum(item2.kpi_formula_month04_code)){
          kpi_formula_numList.push(4);
        }
        if(isNum(item2.kpi_formula_month05_code)){
          kpi_formula_numList.push(5);
        }
        if(isNum(item2.kpi_formula_month06_code)){
          kpi_formula_numList.push(6);
        }
        if(isNum(item2.kpi_formula_month07_code)){
          kpi_formula_numList.push(7);
        }
        if(isNum(item2.kpi_formula_month08_code)){
          kpi_formula_numList.push(8);
        }
        if(isNum(item2.kpi_formula_month09_code)){
          kpi_formula_numList.push(9);
        }
        if(isNum(item2.kpi_formula_month10_code)){
          kpi_formula_numList.push(10);
        }
        if(isNum(item2.kpi_formula_month11_code)){
          kpi_formula_numList.push(11);
        }
        if(isNum(item2.kpi_formula_month12_code)){
          kpi_formula_numList.push(12);
        }
      }
      if(isNum(item2.kpi_formula_last_zsum_code)){
        kpi_formula_numList.push(-4);
      }
      if(isNum(item2.kpi_formula_zsum_code)){
        kpi_formula_numList.push(-1);
      }
      return kpi_formula_numList;
    },
    message=function(msg){
      return {type: 'warning', dangerouslyUseHTMLString: true,message: msg};
    },
    removeStroge=function(){
      localStorage.removeItem('activeIndex');
      localStorage.removeItem('options_table_code');
      localStorage.removeItem('invest_budget_type_code');
      localStorage.removeItem('active_invest');
      localStorage.removeItem('params');
    }
    ;

export {getIndustrialGroup,getCity,getPartition,getPage,getMember,axiosPackage,getNumber,removeRurrent,getReport,getDate_http,powerPage,currentRow_fixed,currentRow,message,getKpi_formula_num,isNum,removeStroge};
