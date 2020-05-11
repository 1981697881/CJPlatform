import {getLodop} from '@/tools/LodopFuncs'
// 成品排产信息
const PrintSales = (data, codetype, url, code) => {
  function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
      if (val[i].match(/[^\x00-\xff]/ig) != null) {
        //全角
        len += 2;
      } else {
        len += 1;
      }

    }
    return len;
  }
  function floatAdd(arg1, arg2) {
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    return (arg1*m+arg2*m)/m;
  }
  function fucCheckLength(strTemp) {
    var i, sum;
    sum = 0;
    for (i = 0; i < strTemp.length; i++) {
      if ((strTemp.charCodeAt(i) >= 0) && (strTemp.charCodeAt(i) <= 255)) {
        sum = sum + 1;
      } else {
        sum = sum + 2;
      }
    }
    return sum;
  }
  LODOP.SET_PRINT_PAGESIZE(3, 0, 0, "A4");//一开始用的是像素，后来都改成用mm为单位
  let fenyeSize = 140,
    num = 2;
  for (let i = 0; i < data.length; i++) {
    if (Math.ceil(data[i].orderDetails.length / 7) > 1) {
      var printNum = Math.ceil(data[i].orderDetails.length / 7)
      for (var a = 0; a < printNum; a++) {
        let bshi;
        let lastheght = 2;
        //设置文本，参数(距离页面头部，距离页面左边距离，文本宽度，文本高度，文本内容
        LODOP.ADD_PRINT_TEXT("4mm", "2mm", "201.55mm", "102mm", data[i].plaName + '配送出库单');
        LODOP.SET_PRINT_STYLEA(0, "TextFrame", 8);
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 0);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 20);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        let size = 10;
        let extendSize = 0;
        let table_hegth = (size + 1) * 25;
        let fonsize = 4;
        //上面的信息
        LODOP.SET_PRINT_STYLE("FontSize", 11);
        LODOP.ADD_PRINT_TEXT("12.20mm", "2mm", "60.13mm", "7.37mm", "购货单位：" + data[i].customer);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 1);
        LODOP.ADD_PRINT_TEXT("13.20mm", "69.54mm", "80.13mm", "7.37mm", "日期：" + data[i].createTime);
        LODOP.ADD_PRINT_TEXT("12.20mm", "140.54mm", "60.13mm", "7.37mm", "单号：" + data[i].orderId);
        LODOP.ADD_PRINT_TEXT("6.11mm", "140.54mm", "60.13mm", "7.37mm", "本单总页数：" + " 第 "+ ( a + 1 ) + " 页 总：" + Math.ceil(data[i].orderDetails.length / 7));
        //标题等
        LODOP.SET_PRINT_STYLE("FontSize", 10);
        LODOP.ADD_PRINT_TEXT("22.15mm", "1mm", "11mm", "5.37mm", "序号");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT("22.15mm", "12mm", "26mm", "5.37mm", "产品代码");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT("22.15mm", "38mm", "40mm", "5.37mm", "产品名称");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT("22.15mm", "78mm", "18mm", "5.37mm", "规格型号");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT("22.15mm", "96mm", "15mm", "5.37mm", "单位");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT("22.15mm", "111mm", "18mm", "5.37mm", "实发数量");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT("22.15mm", "129mm", "20mm", "5.37mm", "单价");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT("22.15mm", "149mm", "20mm", "5.37mm", "金额");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT("22.15mm", "169mm", "31mm", "5.37mm", "备注");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        //表格线
        LODOP.ADD_PRINT_LINE("19.31mm", "1mm", "19.31mm", "201.55mm", 0, 1);// 最上条标题横线
        LODOP.ADD_PRINT_LINE("28.31mm", "1mm", "28.31mm", "201.55mm", 0, 1);// 标题下横线
        LODOP.ADD_PRINT_LINE("19.31mm", "1mm", "28.11mm", "1mm", 0, 1);// 最左竖线

        //添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
        LODOP.ADD_PRINT_LINE("19.31mm", "10mm", "28.11mm", "10mm", 0, 1);  // 收款后竖线  序号
        LODOP.ADD_PRINT_LINE("19.31mm", "38mm", "28.11mm", "38mm", 0, 1);  // 起始日期后竖线      编码
        LODOP.ADD_PRINT_LINE("19.31mm", "78mm", "28.11mm", "78mm", 0, 1);  // 终止日期后竖线      名称
        LODOP.ADD_PRINT_LINE("19.31mm", "96mm", "28.11mm", "96mm", 0, 1);// 上次读数后竖线    规格
        LODOP.ADD_PRINT_LINE("19.31mm", "111mm", "28.11mm", "111mm", 0, 1);// 本次读数后竖线   单位
        LODOP.ADD_PRINT_LINE("19.31mm", "129mm", "28.11mm", "129mm", 0, 1);// 用量后竖线       实发数量
        LODOP.ADD_PRINT_LINE("19.31mm", "149mm", "28.11mm", "149mm", 0, 1);// 单价后竖线       单价
        LODOP.ADD_PRINT_LINE("19.31mm", "169mm", "28.11mm", "169mm", 0, 1);// 后后竖线      金额
        LODOP.ADD_PRINT_LINE("19.31mm", "201.55mm", "28.11mm", "201.55mm", 0, 1);// 后后竖线      备注

        //动态列表信息
        let trheight = 28.4;//用于每个竖线距离上面的固定长度
        let thHeight = 32;//用于每行距离上面的固定长度47.98
        let newHeight = 0;//用于动态增加一行的长度
        let lastSize = 0;//分页前的那个下标
        let aaa = "1234567890";
        let bbb = "1234567890";
        let ccc = "1234567";
        let actualNum=0, totalPrice=0;
        for (let k = 0; k < 7; k++) {
          newHeight = (k - lastSize) * 9.37 + extendSize * fonsize;
          let SizeTmpt = parseInt(getByteLen(aaa) / 35);
          if (parseInt(getByteLen(bbb) / 16) > SizeTmpt) {
            SizeTmpt = parseInt(getByteLen(bbb) / 16);
          }
          if (parseInt(getByteLen(ccc) / 17) > SizeTmpt) {
            SizeTmpt = parseInt(getByteLen(ccc) / 17);
          }
          LODOP.SET_PRINT_STYLE("FontSize", 10);
          if (((a + 1) * 7 - 7 + k) < data[i]['orderDetails'].length) {
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "1mm", "9mm", "9mm", parseInt( 1 + k));
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "11mm", "27mm", "12mm", data[i]['orderDetails'][((a + 1) * 7 - 7 + k)].goodCode);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "38mm", "40mm", "12mm", data[i]['orderDetails'][(a + 1) * 7 - 7 + k].goodName);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            if(fucCheckLength(data[i]['orderDetails'][(a + 1) * 7 - 7 + k].standard) > 7) {
              LODOP.ADD_PRINT_TEXT(thHeight + newHeight - 2.5  + "mm", "78mm", "19mm", "12mm", data[i]['orderDetails'][(a + 1) * 7 - 7 + k].standard);
              LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            }else{
              LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "78mm", "19mm", "12mm", data[i]['orderDetails'][(a + 1) * 7 - 7 + k].standard);
              LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            }
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "96mm", "15mm", "12mm", data[i]['orderDetails'][(a + 1) * 7 - 7 + k].unitOfMea);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "111mm", "18mm", "12mm", data[i]['orderDetails'][(a + 1) * 7 - 7 + k].actualNum);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "129mm", "20mm", "12mm", data[i]['orderDetails'][(a + 1) * 7 - 7 + k].sellPrice);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "149mm", "20mm", "12mm", data[i]['orderDetails'][(a + 1) * 7 - 7 + k].totalPrice);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "169mm", "31mm", "12mm", data[i].remark);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            actualNum = Math.round((actualNum + parseInt(data[i]['orderDetails'][k].actualNum)) * 100) / 100;
            totalPrice = floatAdd(totalPrice, data[i]['orderDetails'][k].totalPrice);
          } else {
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "1mm", "9mm", "9mm", '');
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "11mm", "27mm", "12mm", '');
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "38mm", "40mm", "12mm", '');
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "78mm", "19mm", "12mm", '');
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "96mm", "15mm", "12mm", '');
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "111mm", "18mm", "12mm", '');
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "129mm", "20mm", "12mm", '');
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "149mm", "20mm", "12mm", '');
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "169mm", "31mm", "12mm", '');
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          }
          extendSize += SizeTmpt;
          newHeight = (k - lastSize) * 9.37 + extendSize * fonsize;
          if (k == lastSize + 1 && k != 1) {
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "1mm", trheight + newHeight - SizeTmpt * fonsize + "mm", "201.55mm", 0, 1);//每条数据后加一横线
          }
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "1mm", trheight + newHeight + 9.37 + "mm", "1mm", 0, 1);//最左竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "10mm", trheight + newHeight + 9.37 + "mm", "10mm", 0, 1);//行号后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "38mm", trheight + newHeight + 9.37 + "mm", "38mm", 0, 1);//供货商后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "78mm", trheight + newHeight + 9.37 + "mm", '78mm', 0, 1);//型号后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "96mm", trheight + newHeight + 9.37 + "mm", '96mm', 0, 1);//型号后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "111mm", trheight + newHeight + 9.37 + "mm", '111mm', 0, 1);//型号后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "129mm", trheight + newHeight + 9.37 + "mm", "129mm", 0, 1);//颜色后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "149mm", trheight + newHeight + 9.37 + "mm", "149mm", 0, 1);//单价后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "169mm", trheight + newHeight + 9.37 + "mm", "169mm", 0, 1);//单价后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "201.55mm", trheight + newHeight + 9.37 + "mm", "201.55mm", 0, 1);//最右竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight + 9.57 + "mm", "1mm", trheight + newHeight + 9.57 + "mm", "201.55mm", 0, 1);//每条数据后加一横线
          if ((trheight + newHeight + 9.57) % fenyeSize <= fenyeSize && (trheight + 9.57 + newHeight) % fenyeSize >= (fenyeSize - 15)) {
            LODOP.NewPage();
            thHeight = 0.67;
            lastSize = k;
            trheight = 0;
            extendSize = 0;
          }

        }
        table_hegth = trheight + newHeight + 5.57;
        // 最下显示订单信息
        let moneyWeight = 0;
        if ((lastheght + table_hegth + 5) % fenyeSize <= fenyeSize && (lastheght + table_hegth + 5) % fenyeSize >= (fenyeSize - 6)) {
          LODOP.NewPage();
          lastheght = 0;
          table_hegth = 0;

        }
        //设置文本，参数(距离页面头部，距离页面左边距离，文本宽度，文本高度，文本内容)
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + "mm", "2mm", "20.13mm", "5.37mm", "合    计");
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + "mm", "80.54mm", "60.81mm", "5.37mm", "数量合计： " + actualNum);
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + "mm", "140.54mm", "60.81mm", "5.37mm", "金额合计： " + totalPrice);
        //添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
        LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 10 + "mm", "1mm", lastheght + table_hegth + 10 + "mm", "201.55mm", 0, 1);// 标题下横线
        LODOP.ADD_PRINT_LINE(lastheght + table_hegth + "mm", "1mm", lastheght + table_hegth + 10 +  "mm", "1mm", 0, 1);//最左竖线
        LODOP.ADD_PRINT_LINE(lastheght + table_hegth + "mm", "201.55mm", lastheght + table_hegth + 10 +  "mm", "201.55mm", 0, 1);//最右竖线
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + "mm", "2mm", "120.13mm", "7.37mm", "制单人：" + data[i].auditor);
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + "mm", "52mm", "120.13mm", "7.37mm", "发货人：" + data[i].auditor);
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + "mm", "102mm", "120.13mm", "7.37mm", "司机：");
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + "mm", "152mm", "120.13mm", "7.37mm", "收货单位签收人：");
        LODOP.NewPage();
      }
    } else {
      let lastheght = 2;
      //设置文本，参数(距离页面头部，距离页面左边距离，文本宽度，文本高度，文本内容
      LODOP.ADD_PRINT_TEXT("4mm", "2mm", "201.55mm", "102mm", data[i].plaName + '配送出库单');
      LODOP.SET_PRINT_STYLEA(0, "TextFrame", 8);
      LODOP.SET_PRINT_STYLEA(0, "ItemType", 0);
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 20);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      let size = 10;
      let extendSize = 0;
      let table_hegth = (size + 1) * 25;
      let fonsize = 4;
      //上面的信息
      console.log(Math.ceil(data[i].orderDetails.length / 7))
      LODOP.SET_PRINT_STYLE("FontSize", 11);
      LODOP.ADD_PRINT_TEXT("12.20mm", "2mm", "60.13mm", "7.37mm", "购货单位：" + data[i].customer);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 1);
      LODOP.ADD_PRINT_TEXT("13.20mm", "69.54mm", "80.13mm", "7.37mm", "日期：" + data[i].createTime);
      LODOP.ADD_PRINT_TEXT("12.20mm", "140.54mm", "60.13mm", "7.37mm", "单号：" + data[i].orderId);
      LODOP.ADD_PRINT_TEXT("6.11mm", "140.54mm", "60.13mm", "7.37mm", "本单总页数：" + "第 1 页 总：" + Math.ceil(data[i].orderDetails.length / 7));
      //标题等
      LODOP.SET_PRINT_STYLE("FontSize", 10);
      LODOP.ADD_PRINT_TEXT("22.15mm", "1mm", "11mm", "5.37mm", "序号");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT("22.15mm", "12mm", "26mm", "5.37mm", "产品代码");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT("22.15mm", "38mm", "40mm", "5.37mm", "产品名称");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT("22.15mm", "78mm", "18mm", "5.37mm", "规格型号");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT("22.15mm", "96mm", "15mm", "5.37mm", "单位");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT("22.15mm", "111mm", "18mm", "5.37mm", "实发数量");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT("22.15mm", "129mm", "20mm", "5.37mm", "单价");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT("22.15mm", "149mm", "20mm", "5.37mm", "金额");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT("22.15mm", "169mm", "31mm", "5.37mm", "备注");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      //表格线
      LODOP.ADD_PRINT_LINE("19.31mm", "1mm", "19.31mm", "201.55mm", 0, 1);// 最上条标题横线
      LODOP.ADD_PRINT_LINE("28.31mm", "1mm", "28.31mm", "201.55mm", 0, 1);// 标题下横线
      LODOP.ADD_PRINT_LINE("19.31mm", "1mm", "28.11mm", "1mm", 0, 1);// 最左竖线

      //添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
      LODOP.ADD_PRINT_LINE("19.31mm", "10mm", "28.11mm", "10mm", 0, 1);  // 收款后竖线  序号
      LODOP.ADD_PRINT_LINE("19.31mm", "38mm", "28.11mm", "38mm", 0, 1);  // 起始日期后竖线      编码
      LODOP.ADD_PRINT_LINE("19.31mm", "78mm", "28.11mm", "78mm", 0, 1);  // 终止日期后竖线      名称
      LODOP.ADD_PRINT_LINE("19.31mm", "96mm", "28.11mm", "96mm", 0, 1);// 上次读数后竖线    规格
      LODOP.ADD_PRINT_LINE("19.31mm", "111mm", "28.11mm", "111mm", 0, 1);// 本次读数后竖线   单位
      LODOP.ADD_PRINT_LINE("19.31mm", "129mm", "28.11mm", "129mm", 0, 1);// 用量后竖线       实发数量
      LODOP.ADD_PRINT_LINE("19.31mm", "149mm", "28.11mm", "149mm", 0, 1);// 单价后竖线       单价
      LODOP.ADD_PRINT_LINE("19.31mm", "169mm", "28.11mm", "169mm", 0, 1);// 后后竖线      金额
      LODOP.ADD_PRINT_LINE("19.31mm", "201.55mm", "28.11mm", "201.55mm", 0, 1);// 后后竖线      备注

      //动态列表信息
      let trheight = 28.4;//用于每个竖线距离上面的固定长度
      let thHeight = 32;//用于每行距离上面的固定长度47.98
      let newHeight = 0;//用于动态增加一行的长度
      let lastSize = 0;//分页前的那个下标
      let allProductNumber = 0;
      let aaa = "1234567890";
      let bbb = "1234567890";
      let ccc = "1234567";
      let actualNum=0,totalPrice=0;
      for (let k = 0; k < 7; k++) {
        newHeight = (k - lastSize) * 9.37 + extendSize * fonsize;
        let SizeTmpt = parseInt(getByteLen(aaa) / 35);
        if (parseInt(getByteLen(bbb) / 16) > SizeTmpt) {
          SizeTmpt = parseInt(getByteLen(bbb) / 16);
        }
        if (parseInt(getByteLen(ccc) / 17) > SizeTmpt) {
          SizeTmpt = parseInt(getByteLen(ccc) / 17);
        }
        LODOP.SET_PRINT_STYLE("FontSize", 10);
        if (k < data[i]['orderDetails'].length) {
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "1mm", "9mm", "9mm", parseInt( 1 + k));
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "11mm", "27mm", "12mm", data[i]['orderDetails'][k].goodCode);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "38mm", "40mm", "12mm", data[i]['orderDetails'][k].goodName);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          if(fucCheckLength(data[i]['orderDetails'][k].standard) > 7) {
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight - 2.5  + "mm", "78mm", "19mm", "12mm", data[i][k].standard);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          }else{
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "78mm", "19mm", "12mm", data[i]['orderDetails'][k].standard);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          }
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "96mm", "15mm", "12mm", data[i]['orderDetails'][k].unitOfMea);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "111mm", "18mm", "12mm", data[i]['orderDetails'][k].actualNum);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "129mm", "20mm", "12mm", data[i]['orderDetails'][k].sellPrice);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "149mm", "20mm", "12mm", data[i]['orderDetails'][k].totalPrice);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "169mm", "31mm", "12mm", data[i].remark);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          actualNum = Math.round((actualNum + parseInt(data[i]['orderDetails'][k].actualNum)) * 100) / 100;
          totalPrice = (totalPrice + parseFloat(data[i]['orderDetails'][k].totalPrice) * 100) / 100
        } else {
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "1mm", "9mm", "9mm", '');
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "11mm", "27mm", "12mm", '');
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "38mm", "40mm", "12mm", '');
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "78mm", "19mm", "12mm", '');
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "96mm", "15mm", "12mm", '');
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "111mm", "18mm", "12mm", '');
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "129mm", "20mm", "12mm", '');
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "149mm", "20mm", "12mm", '');
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "169mm", "31mm", "12mm", '');
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        }
        extendSize += SizeTmpt;
        newHeight = (k - lastSize) * 9.37 + extendSize * fonsize;
        if (k == lastSize + 1 && k != 1) {
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "1mm", trheight + newHeight - SizeTmpt * fonsize + "mm", "201.55mm", 0, 1);//每条数据后加一横线
        }
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "1mm", trheight + newHeight + 9.37 + "mm", "1mm", 0, 1);//最左竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "10mm", trheight + newHeight + 9.37 + "mm", "10mm", 0, 1);//行号后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "38mm", trheight + newHeight + 9.37 + "mm", "38mm", 0, 1);//供货商后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "78mm", trheight + newHeight + 9.37 + "mm", '78mm', 0, 1);//型号后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "96mm", trheight + newHeight + 9.37 + "mm", '96mm', 0, 1);//型号后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "111mm", trheight + newHeight + 9.37 + "mm", '111mm', 0, 1);//型号后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "129mm", trheight + newHeight + 9.37 + "mm", "129mm", 0, 1);//颜色后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "149mm", trheight + newHeight + 9.37 + "mm", "149mm", 0, 1);//单价后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "169mm", trheight + newHeight + 9.37 + "mm", "169mm", 0, 1);//单价后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "201.55mm", trheight + newHeight + 9.37 + "mm", "201.55mm", 0, 1);//最右竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight + 9.57 + "mm", "1mm", trheight + newHeight + 9.57 + "mm", "201.55mm", 0, 1);//每条数据后加一横线
        if ((trheight + newHeight + 9.57) % fenyeSize <= fenyeSize && (trheight + 9.57 + newHeight) % fenyeSize >= (fenyeSize - 15)) {
          LODOP.NewPage();
          thHeight = 0.67;
          lastSize = k;
          trheight = 0;
          extendSize = 0;
        }

      }
      table_hegth = trheight + newHeight + 5.57;
      // 最下显示订单信息
      let moneyWeight = 0;
      if ((lastheght + table_hegth + 5) % fenyeSize <= fenyeSize && (lastheght + table_hegth + 5) % fenyeSize >= (fenyeSize - 6)) {
        LODOP.NewPage();
        lastheght = 0;
        table_hegth = 0;

      }
      //设置文本，参数(距离页面头部，距离页面左边距离，文本宽度，文本高度，文本内容)
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 3 + "mm", "2mm", "20.13mm", "5.37mm", "合    计");
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 3 + "mm", "80.54mm", "60.81mm", "5.37mm", "数量合计： " + actualNum);
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 3 + "mm", "140.54mm", "60.81mm", "5.37mm", "金额合计： " + totalPrice);
      //添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
      LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 8 + "mm", "1mm", lastheght + table_hegth + 8 + "mm", "201.55mm", 0, 1);// 标题下横线
      LODOP.ADD_PRINT_LINE(lastheght + table_hegth + "mm", "1mm", lastheght + table_hegth + 8 +  "mm", "1mm", 0, 1);//最左竖线
      LODOP.ADD_PRINT_LINE(lastheght + table_hegth + "mm", "201.55mm", lastheght + table_hegth + 8 +  "mm", "201.55mm", 0, 1);//最右竖线
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 10 + "mm", "2mm", "120.13mm", "7.37mm", "制单人：" + data[i].auditor);
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 10 + "mm", "52mm", "120.13mm", "7.37mm", "发货人：" + data[i].auditor);
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 10 + "mm", "102mm", "120.13mm", "7.37mm", "司机：");
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 10 + "mm", "152mm", "120.13mm", "7.37mm", "收货单位签收人：");
      LODOP.NewPage();
    }
  }
}
// 半成品排产信息
const PrintReturn = (data, codetype, url, code) => {
  console.log(data)

  function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
      if (val[i].match(/[^\x00-\xff]/ig) != null) {
        //全角
        len += 2;
      } else {
        len += 1;
      }

    }
    return len;
  }

  LODOP.SET_PRINT_PAGESIZE(3, 0, 0, "A4");//一开始用的是像素，后来都改成用mm为单位
  let fenyeSize = 140,
    num = 2;
  for (let i = 0; i < num; i++) {
    let lastheght = 2;
    //左边栏
    // LODOP.ADD_PRINT_TEXT("4mm", "0mm", "202mm", "12mm", data[i].header['creator']);
    LODOP.SET_PRINT_STYLEA(0, "TextFrame", 8);
    LODOP.SET_PRINT_STYLEA(0, "ItemType", 0);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 19);
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
    //设置文本，参数(距离页面头部，距离页面左边距离，文本宽度，文本高度，文本内容
    LODOP.ADD_PRINT_TEXT("0mm", "2mm", "201.55mm", "102mm", "销售出库单");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 25);
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    let size = 10;
    let extendSize = 0;
    let table_hegth = (size + 1) * 25;
    let fonsize = 4;
    //上面的信息
    LODOP.SET_PRINT_STYLE("FontSize", 11);
    // LODOP.ADD_PRINT_TEXT("25.29mm", "12.54mm", "202mm", "7.37mm", "单元名称：" + data[i].header['unitName']);
    LODOP.ADD_PRINT_TEXT("12.20mm", "2mm", "60.13mm", "7.37mm", "购货单位：");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 1);
    LODOP.ADD_PRINT_TEXT("18.11mm", "2mm", "60.13mm", "7.37mm", "电  话：");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 1);

    LODOP.ADD_PRINT_TEXT("12.20mm", "69.54mm", "80.13mm", "7.37mm", "审核日期：");
    LODOP.ADD_PRINT_TEXT("18.11mm", "69.54mm", "80.13mm", "7.37mm", "打印日期：");
    // LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    LODOP.ADD_PRINT_TEXT("12.20mm", "140.54mm", "60.13mm", "7.37mm", "已审核：" + "第" + parseInt(i + 1) + " 页 总：");
    LODOP.ADD_PRINT_TEXT("6.11mm", "140.54mm", "60.13mm", "7.37mm", "单号：");
    LODOP.ADD_PRINT_TEXT("18.11mm", "140.54mm", "60.13mm", "7.37mm", "支付方式：");
    // LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    //标题等
    LODOP.ADD_PRINT_TEXT("25.15mm", "1mm", "11mm", "5.37mm", "序号");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.ADD_PRINT_TEXT("25.15mm", "12mm", "26mm", "5.37mm", "编码");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.ADD_PRINT_TEXT("25.15mm", "38mm", "32mm", "5.37mm", "名称");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.ADD_PRINT_TEXT("25.15mm", "70mm", "33mm", "5.37mm", "车型");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.ADD_PRINT_TEXT("25.15mm", "103mm", "13mm", "5.37mm", "品牌");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.ADD_PRINT_TEXT("25.15mm", "116mm", "13mm", "5.37mm", "产地");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.ADD_PRINT_TEXT("25.15mm", "128mm", "12mm", "5.37mm", "单位");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.ADD_PRINT_TEXT("25.15mm", "137mm", "12mm", "5.37mm", "数量");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.ADD_PRINT_TEXT("25.15mm", "147mm", "13mm", "5.37mm", "单价");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.ADD_PRINT_TEXT("25.15mm", "160mm", "18mm", "5.37mm", "金额");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.ADD_PRINT_TEXT("25.15mm", "178mm", "23.55mm", "5.37mm", "仓库仓位");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    //表格线
    LODOP.ADD_PRINT_LINE("24.31mm", "1mm", "24.31mm", "201.55mm", 0, 1);// 最上条标题横线
    LODOP.ADD_PRINT_LINE("29.31mm", "1mm", "29.31mm", "201.55mm", 0, 1);// 标题下横线
    LODOP.ADD_PRINT_LINE("24.31mm", "1mm", "29.11mm", "1mm", 0, 1);// 最左竖线

    //添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
    LODOP.ADD_PRINT_LINE("24.31mm", "10mm", "29.11mm", "10mm", 0, 1);  // 收款后竖线  序号
    LODOP.ADD_PRINT_LINE("24.31mm", "38mm", "29.11mm", "38mm", 0, 1);  // 起始日期后竖线      编码
    LODOP.ADD_PRINT_LINE("24.31mm", "70mm", "29.11mm", "70mm", 0, 1);  // 终止日期后竖线      名称
    LODOP.ADD_PRINT_LINE("24.31mm", "103mm", "29.11mm", "103mm", 0, 1);// 上次读数后竖线    车型
    LODOP.ADD_PRINT_LINE("24.31mm", "116mm", "29.11mm", "116mm", 0, 1);// 本次读数后竖线   品牌
    LODOP.ADD_PRINT_LINE("24.31mm", "129mm", "29.11mm", "129mm", 0, 1);// 用量后竖线       产地
    LODOP.ADD_PRINT_LINE("24.31mm", "138mm", "29.11mm", "138mm", 0, 1);// 单价后竖线       单位
    LODOP.ADD_PRINT_LINE("24.31mm", "147mm", "29.11mm", "147mm", 0, 1);// 后后竖线      数量
    LODOP.ADD_PRINT_LINE("24.31mm", "160mm", "29.11mm", "160mm", 0, 1);// 后后竖线      单价
    LODOP.ADD_PRINT_LINE("24.31mm", "178mm", "29.11mm", "178mm", 0, 1);// 后后竖线      金额
    LODOP.ADD_PRINT_LINE("24.31mm", "201.55mm", "29.11mm", "201.55mm", 0, 1);// 后后竖线      仓库仓位
    //动态列表信息
    let trheight = 29;//用于每个竖线距离上面的固定长度
    let thHeight = 31;//用于每行距离上面的固定长度47.98
    let newHeight = 0;//用于动态增加一行的长度
    let lastSize = 0;//分页前的那个下标
    let allProductNumber = 0;
    let aaa = "1234567890";
    let bbb = "1234567890";
    let ccc = "1234567";
    for (let k = 0; k < 10; k++) {
      newHeight = (k - lastSize) * 5.37 + extendSize * fonsize;
      let SizeTmpt = parseInt(getByteLen(aaa) / 35);
      if (parseInt(getByteLen(bbb) / 16) > SizeTmpt) {
        SizeTmpt = parseInt(getByteLen(bbb) / 16);
      }
      if (parseInt(getByteLen(ccc) / 17) > SizeTmpt) {
        SizeTmpt = parseInt(getByteLen(ccc) / 17);
      }
      //判断是否有数据
      // 数据
      //设置文本，参数(距离页面头部，距离页面左边距离，文本宽度，文本高度，文本内容
      let l = 1 - i * 10;
      if (l > 10) {
        l = 10;
      } else {
        l = 1 - i * 10;
      }
//
//
      let j = i * 10;
      if (k < l) {
        LODOP.SET_PRINT_STYLE("FontSize", 8);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "1mm", "9mm", "9mm", parseInt(j + 1 + k));
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "11mm", "27mm", "12mm", "");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "38mm", "32mm", "12mm", "");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "70mm", "33mm", "12mm", "");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "103mm", "13mm", "12mm", "");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "116mm", "13mm", "12mm", "");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "129mm", "9mm", "12mm", "");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "138mm", "9mm", "12mm", "");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "145.5mm", "17mm", "12mm", "");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "160mm", "18mm", "12mm", "");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "178mm", "23.55mm", "12mm", "");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      } else {
        LODOP.SET_PRINT_STYLE("FontSize", 10);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "13.72mm", "27.55mm", "5.37mm", "");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "39.85mm", "22.52mm", 5.3 + SizeTmpt * fonsize + "mm", "");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "59.65mm", "22.55mm", 5.3 + SizeTmpt * fonsize + "mm", "");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "79.5mm", "22.55mm", 5.3 + SizeTmpt * fonsize + "mm", '');
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "99.57mm", "22.55mm", "5.37mm", '');
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "120.56mm", "16.55mm", "5.37mm", "");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "136.56mm", "16.55mm", "5.37mm", "");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "152.56mm", "18.55mm", "5.37mm", "");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + "mm", "170.82mm", "19.81mm", "5.37mm", '');
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      }

      extendSize += SizeTmpt;
      newHeight = (k - lastSize) * 5.37 + extendSize * fonsize;
      if (k == lastSize + 1 && k != 1) {
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "1mm", trheight + newHeight - SizeTmpt * fonsize + "mm", "201.55mm", 0, 1);//每条数据后加一横线
      }
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "1mm", trheight + newHeight + 5.37 + "mm", "1mm", 0, 1);//最左竖线
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "10mm", trheight + newHeight + 5.37 + "mm", "10mm", 0, 1);//行号后竖线
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "38mm", trheight + newHeight + 5.37 + "mm", "38mm", 0, 1);//供货商后竖线
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "70mm", trheight + newHeight + 5.37 + "mm", '70mm', 0, 1);//型号后竖线
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "103mm", trheight + newHeight + 5.37 + "mm", '103mm', 0, 1);//型号后竖线
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "116mm", trheight + newHeight + 5.37 + "mm", '116mm', 0, 1);//型号后竖线
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "129mm", trheight + newHeight + 5.37 + "mm", "129mm", 0, 1);//颜色后竖线
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "138mm", trheight + newHeight + 5.37 + "mm", "138mm", 0, 1);//单价后竖线
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "147mm", trheight + newHeight + 5.37 + "mm", "147mm", 0, 1);//单价后竖线
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "160mm", trheight + newHeight + 5.37 + "mm", "160mm", 0, 1);//单价后竖线
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "178mm", trheight + newHeight + 5.37 + "mm", "178mm", 0, 1);//数量后竖线
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + "mm", "201.55mm", trheight + newHeight + 5.37 + "mm", "201.55mm", 0, 1);//最右竖线
      LODOP.ADD_PRINT_LINE(trheight + newHeight + 5.57 + "mm", "1mm", trheight + newHeight + 5.57 + "mm", "201.55mm", 0, 1);//每条数据后加一横线
      if ((trheight + newHeight + 5.57) % fenyeSize <= fenyeSize && (trheight + 5.57 + newHeight) % fenyeSize >= (fenyeSize - 15)) {
        LODOP.NewPage();
        thHeight = 0.67;
        lastSize = k;
        trheight = 0;
        extendSize = 0;
      }
    }

    table_hegth = trheight + newHeight + 5.57;
    // 最下显示订单信息
    let moneyWeight = 0;
    if ((lastheght + table_hegth + 5) % fenyeSize <= fenyeSize && (lastheght + table_hegth + 5) % fenyeSize >= (fenyeSize - 6)) {
      LODOP.NewPage();
      lastheght = 0;
      table_hegth = 0;

    }
    //设置文本，参数(距离页面头部，距离页面左边距离，文本宽度，文本高度，文本内容)
    LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + "mm", "2mm", "60.81mm", "5.37mm", "其他费用：");
    LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 5 + "mm", "2mm", "60.13mm", "5.37mm", "大    写:");
    LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 5 + "mm", "80.54mm", "60.81mm", "5.37mm", "合计： ");
    LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 5 + "mm", "180.54mm", "60.81mm", "5.37mm", "元");
    //添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
    LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 10 + "mm", "2mm", lastheght + table_hegth + 10 + "mm", "201.55mm", 0, 1);// 标题下横线

    LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + "mm", "2mm", "120.13mm", "7.37mm", "业务员：");
    LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + "mm", "52mm", "120.13mm", "7.37mm", "检货：");
    LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + "mm", "102mm", "120.13mm", "7.37mm", "验货：");
    LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + "mm", "152mm", "120.13mm", "7.37mm", "包装：");
    LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 17 + "mm", "2mm", "120.13mm", "7.37mm", "电话：");
    LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 17 + "mm", "72mm", "120.13mm", "7.37mm", "运输公司：");
    LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 17 + "mm", "142mm", "120.13mm", "7.37mm", "运输方式：");
    LODOP.NewPage();
  }
}
export {PrintSales, PrintReturn}
