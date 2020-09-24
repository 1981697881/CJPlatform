import {getLodop} from '@/tools/LodopFuncs'
// 订单信息
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
    var r1, r2, m;
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
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

  LODOP.PRINT_INITA(0, 0, 210, 140, '210*140标签');
  LODOP.SET_PRINT_PAGESIZE(1, '210mm', '140mm', '');
  let fenyeSize = 140,
    num = 2;
  for (let i = 0; i < data.length; i++) {
    if (Math.ceil(data[i].orderDetails.length / 8) > 1) {
      var printNum = Math.ceil(data[i].orderDetails.length / 8)
      for (var a = 0; a < printNum; a++) {
        let bshi;
        let lastheght = 2;
        //设置文本，参数(距离页面头部，距离页面左边距离，文本宽度，文本高度，文本内容
        LODOP.ADD_PRINT_TEXT('4mm', '2mm', '201.55mm', '102mm', data[i].plaName + '配送出库单');
        LODOP.SET_PRINT_STYLEA(0, 'TextFrame', 8);
        LODOP.SET_PRINT_STYLEA(0, 'ItemType', 0);
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 20);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        let size = 10;
        let extendSize = 0;
        let table_hegth = (size + 1) * 25;
        let fonsize = 4;
        //上面的信息
        LODOP.SET_PRINT_STYLE('FontSize', 11);
        LODOP.ADD_PRINT_TEXT('12.20mm', '2mm', '60.13mm', '7.37mm', '购货单位：' + data[i].customer);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 1);
        LODOP.ADD_PRINT_TEXT('13.20mm', '69.54mm', '80.13mm', '7.37mm', '日期：' + data[i].createTime);
        LODOP.ADD_PRINT_TEXT('12.20mm', '140.54mm', '60.13mm', '7.37mm', '单号：' + data[i].orderId);
        LODOP.ADD_PRINT_TEXT('6.11mm', '140.54mm', '60.13mm', '7.37mm', '本单总页数：' + ' 第 ' + (a + 1) + ' 页 总：' + Math.ceil(data[i].orderDetails.length / 8));
        //标题等
        LODOP.SET_PRINT_STYLE('FontSize', 10);
        LODOP.ADD_PRINT_TEXT('22.15mm', '1mm', '11mm', '5.37mm', '序号');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '12mm', '26mm', '5.37mm', '产品代码');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '38mm', '40mm', '5.37mm', '产品名称');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '78mm', '18mm', '5.37mm', '规格型号');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '96mm', '15mm', '5.37mm', '单位');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '111mm', '18mm', '5.37mm', '实发数量');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '129mm', '20mm', '5.37mm', '单价');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '149mm', '20mm', '5.37mm', '金额');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '169mm', '31mm', '5.37mm', '备注');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        //表格线
        LODOP.ADD_PRINT_LINE('19.31mm', '1mm', '19.31mm', '201.55mm', 0, 1);// 最上条标题横线
        LODOP.ADD_PRINT_LINE('28.31mm', '1mm', '28.31mm', '201.55mm', 0, 1);// 标题下横线
        LODOP.ADD_PRINT_LINE('19.31mm', '1mm', '28.11mm', '1mm', 0, 1);// 最左竖线

        //添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
        LODOP.ADD_PRINT_LINE('19.31mm', '10mm', '28.11mm', '10mm', 0, 1);  // 收款后竖线  序号
        LODOP.ADD_PRINT_LINE('19.31mm', '38mm', '28.11mm', '38mm', 0, 1);  // 起始日期后竖线      编码
        LODOP.ADD_PRINT_LINE('19.31mm', '78mm', '28.11mm', '78mm', 0, 1);  // 终止日期后竖线      名称
        LODOP.ADD_PRINT_LINE('19.31mm', '96mm', '28.11mm', '96mm', 0, 1);// 上次读数后竖线    规格
        LODOP.ADD_PRINT_LINE('19.31mm', '111mm', '28.11mm', '111mm', 0, 1);// 本次读数后竖线   单位
        LODOP.ADD_PRINT_LINE('19.31mm', '129mm', '28.11mm', '129mm', 0, 1);// 用量后竖线       实发数量
        LODOP.ADD_PRINT_LINE('19.31mm', '149mm', '28.11mm', '149mm', 0, 1);// 单价后竖线       单价
        LODOP.ADD_PRINT_LINE('19.31mm', '169mm', '28.11mm', '169mm', 0, 1);// 后后竖线      金额
        LODOP.ADD_PRINT_LINE('19.31mm', '201.55mm', '28.11mm', '201.55mm', 0, 1);// 后后竖线      备注

        //动态列表信息
        let trheight = 28.4;//用于每个竖线距离上面的固定长度
        let thHeight = 32;//用于每行距离上面的固定长度47.98
        let newHeight = 0;//用于动态增加一行的长度
        let lastSize = 0;//分页前的那个下标
        let aaa = '1234567890';
        let bbb = '1234567890';
        let ccc = '1234567';
        let actualNum = 0, totalPrice = 0;
        for (let k = 0; k < 8; k++) {
          newHeight = (k - lastSize) * 9.37 + extendSize * fonsize;
          let SizeTmpt = parseInt(getByteLen(aaa) / 35);
          if (parseInt(getByteLen(bbb) / 16) > SizeTmpt) {
            SizeTmpt = parseInt(getByteLen(bbb) / 16);
          }
          if (parseInt(getByteLen(ccc) / 17) > SizeTmpt) {
            SizeTmpt = parseInt(getByteLen(ccc) / 17);
          }
          LODOP.SET_PRINT_STYLE('FontSize', 10);
          if (((a + 1) * 8 - 8 + k) < data[i]['orderDetails'].length) {
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '9mm', '9mm', parseInt(1 + k));
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '11mm', '27mm', '12mm', data[i]['orderDetails'][((a + 1) * 8 - 8 + k)].goodCode);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '38mm', '40mm', '12mm', data[i]['orderDetails'][(a + 1) * 8 - 8 + k].goodName);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            if (fucCheckLength(data[i]['orderDetails'][(a + 1) * 8 - 8 + k].standard) > 8) {
              LODOP.ADD_PRINT_TEXT(thHeight + newHeight - 2.5 + 'mm', '78mm', '19mm', '12mm', data[i]['orderDetails'][(a + 1) * 8 - 8 + k].standard);
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            } else {
              LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '78mm', '19mm', '12mm', data[i]['orderDetails'][(a + 1) * 8 - 8 + k].standard);
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            }
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '96mm', '15mm', '12mm', data[i]['orderDetails'][(a + 1) * 8 - 8 + k].unitOfMea);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '111mm', '18mm', '12mm', data[i]['orderDetails'][(a + 1) * 8 - 8 + k].actualNum);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '129mm', '20mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '149mm', '20mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '169mm', '31mm', '12mm', data[i].remark);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            actualNum = Math.round((actualNum + parseInt(data[i]['orderDetails'][(a + 1) * 8 - 8 + k].actualNum)) * 100) / 100;
            /*  totalPrice = floatAdd(totalPrice, data[i]['orderDetails'][(a + 1) * 7 - 7 + k].totalPrice);*/
          } else {
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '9mm', '9mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '11mm', '27mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '38mm', '40mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '78mm', '19mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '96mm', '15mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '111mm', '18mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '129mm', '20mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '149mm', '20mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '169mm', '31mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          }
          extendSize += SizeTmpt;
          newHeight = (k - lastSize) * 9.37 + extendSize * fonsize;
          if (k == lastSize + 1 && k != 1) {
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight - SizeTmpt * fonsize + 'mm', '201.55mm', 0, 1);//每条数据后加一横线
          }
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight + 9.37 + 'mm', '1mm', 0, 1);//最左竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '10mm', trheight + newHeight + 9.37 + 'mm', '10mm', 0, 1);//行号后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '38mm', trheight + newHeight + 9.37 + 'mm', '38mm', 0, 1);//供货商后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '78mm', trheight + newHeight + 9.37 + 'mm', '78mm', 0, 1);//型号后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '96mm', trheight + newHeight + 9.37 + 'mm', '96mm', 0, 1);//型号后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '111mm', trheight + newHeight + 9.37 + 'mm', '111mm', 0, 1);//型号后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '129mm', trheight + newHeight + 9.37 + 'mm', '129mm', 0, 1);//颜色后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '149mm', trheight + newHeight + 9.37 + 'mm', '149mm', 0, 1);//单价后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '169mm', trheight + newHeight + 9.37 + 'mm', '169mm', 0, 1);//单价后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '201.55mm', trheight + newHeight + 9.37 + 'mm', '201.55mm', 0, 1);//最右竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight + 9.57 + 'mm', '1mm', trheight + newHeight + 9.57 + 'mm', '201.55mm', 0, 1);//每条数据后加一横线
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
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + 'mm', '2mm', '20.13mm', '5.37mm', '合    计');
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + 'mm', '80.54mm', '60.81mm', '5.37mm', '数量合计： ' + actualNum);
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + 'mm', '140.54mm', '60.81mm', '5.37mm', '金额合计： ' + totalPrice);
        //添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
        LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 10 + 'mm', '1mm', lastheght + table_hegth + 10 + 'mm', '201.55mm', 0, 1);// 标题下横线
        LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 'mm', '1mm', lastheght + table_hegth + 10 + 'mm', '1mm', 0, 1);//最左竖线
        LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 'mm', '201.55mm', lastheght + table_hegth + 10 + 'mm', '201.55mm', 0, 1);//最右竖线
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '2mm', '120.13mm', '7.37mm', '制单人：' + data[i].auditor);
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '52mm', '120.13mm', '7.37mm', '发货人：' + data[i].auditor);
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '102mm', '120.13mm', '7.37mm', '司机：');
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '152mm', '120.13mm', '7.37mm', '收货单位签收人：');
        LODOP.NewPage();
      }
    } else {
      let lastheght = 2;
      //设置文本，参数(距离页面头部，距离页面左边距离，文本宽度，文本高度，文本内容
      LODOP.ADD_PRINT_TEXT('4mm', '2mm', '201.55mm', '102mm', data[i].plaName + '配送出库单');
      LODOP.SET_PRINT_STYLEA(0, 'TextFrame', 8);
      LODOP.SET_PRINT_STYLEA(0, 'ItemType', 0);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 20);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      let size = 10;
      let extendSize = 0;
      let table_hegth = (size + 1) * 25;
      let fonsize = 4;
      //上面的信息
      console.log(Math.ceil(data[i].orderDetails.length / 8))
      LODOP.SET_PRINT_STYLE('FontSize', 11);
      LODOP.ADD_PRINT_TEXT('12.20mm', '2mm', '60.13mm', '7.37mm', '购货单位：' + data[i].customer);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 1);
      LODOP.ADD_PRINT_TEXT('13.20mm', '69.54mm', '80.13mm', '7.37mm', '日期：' + data[i].createTime);
      LODOP.ADD_PRINT_TEXT('12.20mm', '140.54mm', '60.13mm', '7.37mm', '单号：' + data[i].orderId);
      LODOP.ADD_PRINT_TEXT('6.11mm', '140.54mm', '60.13mm', '7.37mm', '本单总页数：' + '第 1 页 总：' + Math.ceil(data[i].orderDetails.length / 8));
      //标题等
      LODOP.SET_PRINT_STYLE('FontSize', 10);
      LODOP.ADD_PRINT_TEXT('22.15mm', '1mm', '11mm', '5.37mm', '序号');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '12mm', '26mm', '5.37mm', '产品代码');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '38mm', '40mm', '5.37mm', '产品名称');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '78mm', '18mm', '5.37mm', '规格型号');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '96mm', '15mm', '5.37mm', '单位');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '111mm', '18mm', '5.37mm', '实发数量');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '129mm', '20mm', '5.37mm', '单价');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '149mm', '20mm', '5.37mm', '金额');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '169mm', '31mm', '5.37mm', '备注');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      //表格线
      LODOP.ADD_PRINT_LINE('19.31mm', '1mm', '19.31mm', '201.55mm', 0, 1);// 最上条标题横线
      LODOP.ADD_PRINT_LINE('28.31mm', '1mm', '28.31mm', '201.55mm', 0, 1);// 标题下横线
      LODOP.ADD_PRINT_LINE('19.31mm', '1mm', '28.11mm', '1mm', 0, 1);// 最左竖线

      //添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
      LODOP.ADD_PRINT_LINE('19.31mm', '10mm', '28.11mm', '10mm', 0, 1);  // 收款后竖线  序号
      LODOP.ADD_PRINT_LINE('19.31mm', '38mm', '28.11mm', '38mm', 0, 1);  // 起始日期后竖线      编码
      LODOP.ADD_PRINT_LINE('19.31mm', '78mm', '28.11mm', '78mm', 0, 1);  // 终止日期后竖线      名称
      LODOP.ADD_PRINT_LINE('19.31mm', '96mm', '28.11mm', '96mm', 0, 1);// 上次读数后竖线    规格
      LODOP.ADD_PRINT_LINE('19.31mm', '111mm', '28.11mm', '111mm', 0, 1);// 本次读数后竖线   单位
      LODOP.ADD_PRINT_LINE('19.31mm', '129mm', '28.11mm', '129mm', 0, 1);// 用量后竖线       实发数量
      LODOP.ADD_PRINT_LINE('19.31mm', '149mm', '28.11mm', '149mm', 0, 1);// 单价后竖线       单价
      LODOP.ADD_PRINT_LINE('19.31mm', '169mm', '28.11mm', '169mm', 0, 1);// 后后竖线      金额
      LODOP.ADD_PRINT_LINE('19.31mm', '201.55mm', '28.11mm', '201.55mm', 0, 1);// 后后竖线      备注

      //动态列表信息
      let trheight = 28.4;//用于每个竖线距离上面的固定长度
      let thHeight = 32;//用于每行距离上面的固定长度47.98
      let newHeight = 0;//用于动态增加一行的长度
      let lastSize = 0;//分页前的那个下标
      let allProductNumber = 0;
      let aaa = '1234567890';
      let bbb = '1234567890';
      let ccc = '1234567';
      let actualNum = 0, totalPrice = 0;
      for (let k = 0; k < 8; k++) {
        newHeight = (k - lastSize) * 9.37 + extendSize * fonsize;
        let SizeTmpt = parseInt(getByteLen(aaa) / 35);
        if (parseInt(getByteLen(bbb) / 16) > SizeTmpt) {
          SizeTmpt = parseInt(getByteLen(bbb) / 16);
        }
        if (parseInt(getByteLen(ccc) / 17) > SizeTmpt) {
          SizeTmpt = parseInt(getByteLen(ccc) / 17);
        }
        LODOP.SET_PRINT_STYLE('FontSize', 10);
        if (k < data[i]['orderDetails'].length) {
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '9mm', '9mm', parseInt(1 + k));
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '11mm', '27mm', '12mm', data[i]['orderDetails'][k].goodCode);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '38mm', '40mm', '12mm', data[i]['orderDetails'][k].goodName);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          if (fucCheckLength(data[i]['orderDetails'][k].standard) > 8) {
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight - 2.5 + 'mm', '78mm', '19mm', '12mm', data[i]['orderDetails'][k].standard);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          } else {
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '78mm', '19mm', '12mm', data[i]['orderDetails'][k].standard);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          }
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '96mm', '15mm', '12mm', data[i]['orderDetails'][k].unitOfMea);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '111mm', '18mm', '12mm', data[i]['orderDetails'][k].actualNum);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '129mm', '20mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '149mm', '20mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '169mm', '31mm', '12mm', data[i].remark);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          actualNum = Math.round((actualNum + parseInt(data[i]['orderDetails'][k].actualNum)) * 100) / 100;
          /*totalPrice = floatAdd(totalPrice, data[i]['orderDetails'][k].totalPrice);*/
        } else {
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '9mm', '9mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '11mm', '27mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '38mm', '40mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '78mm', '19mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '96mm', '15mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '111mm', '18mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '129mm', '20mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '149mm', '20mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '169mm', '31mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        }
        extendSize += SizeTmpt;
        newHeight = (k - lastSize) * 9.37 + extendSize * fonsize;
        if (k == lastSize + 1 && k != 1) {
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight - SizeTmpt * fonsize + 'mm', '201.55mm', 0, 1);//每条数据后加一横线
        }
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight + 9.37 + 'mm', '1mm', 0, 1);//最左竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '10mm', trheight + newHeight + 9.37 + 'mm', '10mm', 0, 1);//行号后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '38mm', trheight + newHeight + 9.37 + 'mm', '38mm', 0, 1);//供货商后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '78mm', trheight + newHeight + 9.37 + 'mm', '78mm', 0, 1);//型号后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '96mm', trheight + newHeight + 9.37 + 'mm', '96mm', 0, 1);//型号后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '111mm', trheight + newHeight + 9.37 + 'mm', '111mm', 0, 1);//型号后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '129mm', trheight + newHeight + 9.37 + 'mm', '129mm', 0, 1);//颜色后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '149mm', trheight + newHeight + 9.37 + 'mm', '149mm', 0, 1);//单价后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '169mm', trheight + newHeight + 9.37 + 'mm', '169mm', 0, 1);//单价后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '201.55mm', trheight + newHeight + 9.37 + 'mm', '201.55mm', 0, 1);//最右竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight + 9.57 + 'mm', '1mm', trheight + newHeight + 9.57 + 'mm', '201.55mm', 0, 1);//每条数据后加一横线
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
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + 'mm', '2mm', '20.13mm', '5.37mm', '合    计');
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + 'mm', '80.54mm', '60.81mm', '5.37mm', '数量合计： ' + actualNum);
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + 'mm', '140.54mm', '60.81mm', '5.37mm', '金额合计： ' + totalPrice);
      //添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
      LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 10 + 'mm', '1mm', lastheght + table_hegth + 10 + 'mm', '201.55mm', 0, 1);// 标题下横线
      LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 'mm', '1mm', lastheght + table_hegth + 10 + 'mm', '1mm', 0, 1);//最左竖线
      LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 'mm', '201.55mm', lastheght + table_hegth + 10 + 'mm', '201.55mm', 0, 1);//最右竖线
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '2mm', '120.13mm', '7.37mm', '制单人：' + data[i].auditor);
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '52mm', '120.13mm', '7.37mm', '发货人：' + data[i].auditor);
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '102mm', '120.13mm', '7.37mm', '司机：');
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '152mm', '120.13mm', '7.37mm', '收货单位签收人：');
      LODOP.NewPage();
    }
  }
}
const PrintSales2 = (data, codetype, url, code) => {
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
    var r1, r2, m;
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
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

  LODOP.PRINT_INITA(0, 0, 210, 140, '210*140标签');
  LODOP.SET_PRINT_PAGESIZE(1, '210mm', '140mm', '');
  let fenyeSize = 140,
    num = 2;
  let dObj = {}
  eval("dObj.customer='" + data[0].customer + "'")
  eval("dObj.createTime='" + data[0].createTime + "'")
  eval("dObj.auditTime='" + data[0].auditTime + "'")
  eval("dObj.auditor='" + data[0].auditor + "'")
  eval("dObj.plaName='" + data[0].plaName + "'")
  let dArray = []
  for (let i = 0; i < data.length; i++) {
    for (let aa = 0; aa < data[i].orderDetails.length; aa++) {
      dArray.push(data[i].orderDetails[aa])
    }
    eval("dObj.orderId" + i + "='" + data[i].orderId + "'")
  }
  dObj.orderDetails = dArray
  let printArray = [dObj]
  console.log(printArray)
  for (let i = 0; i < printArray.length; i++) {
    //if (Math.ceil(printArray[i].orderDetails.length / 8) > 1) {
      var printNum = Math.ceil(printArray[i].orderDetails.length / 8)
      for (var a = 0; a < printNum; a++) {
        let bshi;
        let lastheght = 2;
        //设置文本，参数(距离页面头部，距离页面左边距离，文本宽度，文本高度，文本内容
        LODOP.ADD_PRINT_TEXT('4mm', '2mm', '201.55mm', '102mm', printArray[i].plaName + '配送出库单');
        LODOP.SET_PRINT_STYLEA(0, 'TextFrame', 8);
        LODOP.SET_PRINT_STYLEA(0, 'ItemType', 0);
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 20);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        let size = 10;
        let extendSize = 0;
        let table_hegth = (size + 1) * 25;
        let fonsize = 4;
        //上面的信息
        LODOP.SET_PRINT_STYLE('FontSize', 11);
        LODOP.ADD_PRINT_TEXT('12.20mm', '2mm', '60.13mm', '7.37mm', '购货单位：' + printArray[i].customer);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 1);
        LODOP.ADD_PRINT_TEXT('13.20mm', '69.54mm', '80.13mm', '7.37mm', '日期：' + (/\d{4}-\d{1,2}-\d{1,2}/g.exec(printArray[i].auditTime)));
        LODOP.ADD_PRINT_TEXT('6.20mm', '140.54mm', '60.13mm', '7.37mm', '单号：' + printArray[i].orderId0);
        if(printArray[i].orderId1 != null && printArray[i].orderId1 != undefined){
          LODOP.ADD_PRINT_TEXT('10.20mm', '140.54mm', '60.13mm', '7.37mm', '单号：' + printArray[i].orderId1);
        }
        if(printArray[i].orderId2 != null && printArray[i].orderId2 != undefined){
          LODOP.ADD_PRINT_TEXT('14.20mm', '140.54mm', '60.13mm', '7.37mm', '单号：' + printArray[i].orderId2);
        }
        LODOP.ADD_PRINT_TEXT('2.11mm', '140.54mm', '60.13mm', '7.37mm', '本单总页数：' + ' 第 ' + (a + 1) + ' 页 总：' + Math.ceil(printArray[i].orderDetails.length / 8));
        //标题等
        LODOP.SET_PRINT_STYLE('FontSize', 10);
        LODOP.ADD_PRINT_TEXT('22.15mm', '1mm', '11mm', '5.37mm', '序号');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '12mm', '40mm', '5.37mm', '单号');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '52mm', '26mm', '5.37mm', '产品代码');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '78mm', '40mm', '5.37mm', '产品名称');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '118mm', '18mm', '5.37mm', '规格型号');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '136mm', '15mm', '5.37mm', '单位');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '151mm', '18mm', '5.37mm', '实发数量');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '169mm', '31mm', '5.37mm', ' 备注');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        //表格线
        LODOP.ADD_PRINT_LINE('19.31mm', '1mm', '19.31mm', '201.55mm', 0, 1);// 最上条标题横线
        LODOP.ADD_PRINT_LINE('28.31mm', '1mm', '28.31mm', '201.55mm', 0, 1);// 标题下横线
        LODOP.ADD_PRINT_LINE('19.31mm', '1mm', '28.11mm', '1mm', 0, 1);// 最左竖线

        //添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
        LODOP.ADD_PRINT_LINE('19.31mm', '10mm', '28.11mm', '10mm', 0, 1);  // 收款后竖线  序号
        LODOP.ADD_PRINT_LINE('19.31mm', '52mm', '28.11mm', '52mm', 0, 1);  // 起始日期后竖线      编码
        LODOP.ADD_PRINT_LINE('19.31mm', '78mm', '28.11mm', '78mm', 0, 1);  // 终止日期后竖线      名称
        LODOP.ADD_PRINT_LINE('19.31mm', '118mm', '28.11mm', '118mm', 0, 1);// 上次读数后竖线    规格
        LODOP.ADD_PRINT_LINE('19.31mm', '136mm', '28.11mm', '136mm', 0, 1);// 本次读数后竖线   单位
        LODOP.ADD_PRINT_LINE('19.31mm', '151mm', '28.11mm', '151mm', 0, 1);// 用量后竖线       实发数量
        LODOP.ADD_PRINT_LINE('19.31mm', '169mm', '28.11mm', '169mm', 0, 1);// 后后竖线      金额
        LODOP.ADD_PRINT_LINE('19.31mm', '201.55mm', '28.11mm', '201.55mm', 0, 1);// 后后竖线      备注

        //动态列表信息
        let trheight = 28.4;//用于每个竖线距离上面的固定长度
        let thHeight = 32;//用于每行距离上面的固定长度47.98
        let newHeight = 0;//用于动态增加一行的长度
        let lastSize = 0;//分页前的那个下标
        let aaa = '1234567890';
        let bbb = '1234567890';
        let ccc = '1234567';
        let actualNum = 0, totalPrice = 0;
        for (let k = 0; k < 8; k++) {
          newHeight = (k - lastSize) * 9.37 + extendSize * fonsize;
          let SizeTmpt = parseInt(getByteLen(aaa) / 35);
          if (parseInt(getByteLen(bbb) / 16) > SizeTmpt) {
            SizeTmpt = parseInt(getByteLen(bbb) / 16);
          }
          if (parseInt(getByteLen(ccc) / 17) > SizeTmpt) {
            SizeTmpt = parseInt(getByteLen(ccc) / 17);
          }
          LODOP.SET_PRINT_STYLE('FontSize', 10);
          if (((a + 1) * 8 - 8 + k) < printArray[i]['orderDetails'].length) {
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '9mm', '9mm', parseInt(1 + k));
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '11mm', '40mm', '12mm', printArray[i]['orderDetails'][(a + 1) * 8 - 8 + k].orderNum);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '52mm', '27mm', '12mm', printArray[i]['orderDetails'][((a + 1) * 8 - 8 + k)].goodCode);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '78mm', '40mm', '12mm', printArray[i]['orderDetails'][(a + 1) * 8 - 8 + k].goodName);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            if (fucCheckLength(printArray[i]['orderDetails'][(a + 1) * 8 - 8 + k].standard) > 8) {
              LODOP.ADD_PRINT_TEXT(thHeight + newHeight - 2.5 + 'mm', '118mm', '19mm', '12mm', printArray[i]['orderDetails'][(a + 1) * 8 - 8 + k].standard);
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            } else {
              LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '118mm', '19mm', '12mm', printArray[i]['orderDetails'][(a + 1) * 8 - 8 + k].standard);
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            }
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '136mm', '15mm', '12mm', printArray[i]['orderDetails'][(a + 1) * 8 - 8 + k].unitOfMea);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '151mm', '18mm', '12mm', printArray[i]['orderDetails'][(a + 1) * 8 - 8 + k].actualNum);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '169mm', '31mm', '12mm', printArray[i].remark);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            actualNum = Math.round((actualNum + parseInt(printArray[i]['orderDetails'][(a + 1) * 8 - 8 + k].actualNum)) * 100) / 100;
            /*  totalPrice = floatAdd(totalPrice, printArray[i]['orderDetails'][(a + 1) * 7 - 7 + k].totalPrice);*/
          } else {
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '9mm', '9mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '11mm', '27mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '52mm', '40mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '78mm', '19mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '118mm', '15mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '136mm', '18mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '151mm', '20mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '169mm', '31mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          }
          extendSize += SizeTmpt;
          newHeight = (k - lastSize) * 9.37 + extendSize * fonsize;
          if (k == lastSize + 1 && k != 1) {
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight - SizeTmpt * fonsize + 'mm', '201.55mm', 0, 1);//每条数据后加一横线
          }
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight + 9.37 + 'mm', '1mm', 0, 1);//最左竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '10mm', trheight + newHeight + 9.37 + 'mm', '10mm', 0, 1);//行号后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '52mm', trheight + newHeight + 9.37 + 'mm', '52mm', 0, 1);//供货商后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '78mm', trheight + newHeight + 9.37 + 'mm', '78mm', 0, 1);//型号后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '118mm', trheight + newHeight + 9.37 + 'mm', '118mm', 0, 1);//型号后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '136mm', trheight + newHeight + 9.37 + 'mm', '136mm', 0, 1);//型号后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '151mm', trheight + newHeight + 9.37 + 'mm', '151mm', 0, 1);//颜色后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '169mm', trheight + newHeight + 9.37 + 'mm', '169mm', 0, 1);//单价后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '201.55mm', trheight + newHeight + 9.37 + 'mm', '201.55mm', 0, 1);//最右竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight + 9.57 + 'mm', '1mm', trheight + newHeight + 9.57 + 'mm', '201.55mm', 0, 1);//每条数据后加一横线
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
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + 'mm', '2mm', '20.13mm', '5.37mm', '合    计');
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + 'mm', '80.54mm', '60.81mm', '5.37mm', '数量合计： ' + actualNum);
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + 'mm', '140.54mm', '60.81mm', '5.37mm', '金额合计： ' + totalPrice);
        //添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
        LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 10 + 'mm', '1mm', lastheght + table_hegth + 10 + 'mm', '201.55mm', 0, 1);// 标题下横线
        LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 'mm', '1mm', lastheght + table_hegth + 10 + 'mm', '1mm', 0, 1);//最左竖线
        LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 'mm', '201.55mm', lastheght + table_hegth + 10 + 'mm', '201.55mm', 0, 1);//最右竖线
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '2mm', '120.13mm', '7.37mm', '制单人：' + printArray[i].auditor);
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '52mm', '120.13mm', '7.37mm', '发货人：' + printArray[i].auditor);
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '102mm', '120.13mm', '7.37mm', '司机：');
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '152mm', '120.13mm', '7.37mm', '收货单位签收人：');
        LODOP.NewPage();
      }
    //} else {
      /*let lastheght = 2;
      //设置文本，参数(距离页面头部，距离页面左边距离，文本宽度，文本高度，文本内容
      LODOP.ADD_PRINT_TEXT('4mm', '2mm', '201.55mm', '102mm', printArray[i].plaName + '配送出库单');
      LODOP.SET_PRINT_STYLEA(0, 'TextFrame', 8);
      LODOP.SET_PRINT_STYLEA(0, 'ItemType', 0);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 20);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      let size = 10;
      let extendSize = 0;
      let table_hegth = (size + 1) * 25;
      let fonsize = 4;
      //上面的信息
      LODOP.SET_PRINT_STYLE('FontSize', 11);
      LODOP.ADD_PRINT_TEXT('12.20mm', '2mm', '60.13mm', '7.37mm', '购货单位：' + printArray[i].customer);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 1);
      LODOP.ADD_PRINT_TEXT('13.20mm', '69.54mm', '80.13mm', '7.37mm', '日期：' + printArray[i].auditTime);
      LODOP.ADD_PRINT_TEXT('12.20mm', '140.54mm', '60.13mm', '7.37mm', '单号：' + printArray[i].orderId0);
      LODOP.ADD_PRINT_TEXT('6.11mm', '140.54mm', '60.13mm', '7.37mm', '本单总页数：' + '第 1 页 总：' + Math.ceil(printArray[i].orderDetails.length / 8));
      //标题等
      LODOP.SET_PRINT_STYLE('FontSize', 10);
      LODOP.ADD_PRINT_TEXT('22.15mm', '1mm', '11mm', '5.37mm', '序号');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '12mm', '26mm', '5.37mm', '产品代码');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '38mm', '40mm', '5.37mm', '产品名称');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '78mm', '18mm', '5.37mm', '规格型号');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '96mm', '15mm', '5.37mm', '单位');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '111mm', '18mm', '5.37mm', '实发数量');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '129mm', '20mm', '5.37mm', '单价');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '149mm', '20mm', '5.37mm', '金额');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '169mm', '31mm', '5.37mm', '备注');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      //表格线
      LODOP.ADD_PRINT_LINE('19.31mm', '1mm', '19.31mm', '201.55mm', 0, 1);// 最上条标题横线
      LODOP.ADD_PRINT_LINE('28.31mm', '1mm', '28.31mm', '201.55mm', 0, 1);// 标题下横线
      LODOP.ADD_PRINT_LINE('19.31mm', '1mm', '28.11mm', '1mm', 0, 1);// 最左竖线

      //添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
      LODOP.ADD_PRINT_LINE('19.31mm', '10mm', '28.11mm', '10mm', 0, 1);  // 收款后竖线  序号
      LODOP.ADD_PRINT_LINE('19.31mm', '38mm', '28.11mm', '38mm', 0, 1);  // 起始日期后竖线      编码
      LODOP.ADD_PRINT_LINE('19.31mm', '78mm', '28.11mm', '78mm', 0, 1);  // 终止日期后竖线      名称
      LODOP.ADD_PRINT_LINE('19.31mm', '96mm', '28.11mm', '96mm', 0, 1);// 上次读数后竖线    规格
      LODOP.ADD_PRINT_LINE('19.31mm', '111mm', '28.11mm', '111mm', 0, 1);// 本次读数后竖线   单位
      LODOP.ADD_PRINT_LINE('19.31mm', '129mm', '28.11mm', '129mm', 0, 1);// 用量后竖线       实发数量
      LODOP.ADD_PRINT_LINE('19.31mm', '149mm', '28.11mm', '149mm', 0, 1);// 单价后竖线       单价
      LODOP.ADD_PRINT_LINE('19.31mm', '169mm', '28.11mm', '169mm', 0, 1);// 后后竖线      金额
      LODOP.ADD_PRINT_LINE('19.31mm', '201.55mm', '28.11mm', '201.55mm', 0, 1);// 后后竖线      备注

      //动态列表信息
      let trheight = 28.4;//用于每个竖线距离上面的固定长度
      let thHeight = 32;//用于每行距离上面的固定长度47.98
      let newHeight = 0;//用于动态增加一行的长度
      let lastSize = 0;//分页前的那个下标
      let allProductNumber = 0;
      let aaa = '1234567890';
      let bbb = '1234567890';
      let ccc = '1234567';
      let actualNum = 0, totalPrice = 0;
      for (let k = 0; k < 8; k++) {
        newHeight = (k - lastSize) * 9.37 + extendSize * fonsize;
        let SizeTmpt = parseInt(getByteLen(aaa) / 35);
        if (parseInt(getByteLen(bbb) / 16) > SizeTmpt) {
          SizeTmpt = parseInt(getByteLen(bbb) / 16);
        }
        if (parseInt(getByteLen(ccc) / 17) > SizeTmpt) {
          SizeTmpt = parseInt(getByteLen(ccc) / 17);
        }
        LODOP.SET_PRINT_STYLE('FontSize', 10);
        if (k < printArray[i]['orderDetails'].length) {
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '9mm', '9mm', parseInt(1 + k));
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '11mm', '27mm', '12mm', printArray[i]['orderDetails'][k].goodCode);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '38mm', '40mm', '12mm', printArray[i]['orderDetails'][k].goodName);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          if (fucCheckLength(printArray[i]['orderDetails'][k].standard) > 8) {
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight - 2.5 + 'mm', '78mm', '19mm', '12mm', printArray[i]['orderDetails'][k].standard);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          } else {
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '78mm', '19mm', '12mm', printArray[i]['orderDetails'][k].standard);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          }
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '96mm', '15mm', '12mm', printArray[i]['orderDetails'][k].unitOfMea);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '111mm', '18mm', '12mm', printArray[i]['orderDetails'][k].actualNum);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '129mm', '20mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '149mm', '20mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '169mm', '31mm', '12mm', printArray[i].remark);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          actualNum = Math.round((actualNum + parseInt(printArray[i]['orderDetails'][k].actualNum)) * 100) / 100;
          /!*totalPrice = floatAdd(totalPrice, printArray[i]['orderDetails'][k].totalPrice);*!/
        } else {
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '9mm', '9mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '11mm', '27mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '38mm', '40mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '78mm', '19mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '96mm', '15mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '111mm', '18mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '129mm', '20mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '149mm', '20mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '169mm', '31mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        }
        extendSize += SizeTmpt;
        newHeight = (k - lastSize) * 9.37 + extendSize * fonsize;
        if (k == lastSize + 1 && k != 1) {
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight - SizeTmpt * fonsize + 'mm', '201.55mm', 0, 1);//每条数据后加一横线
        }
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight + 9.37 + 'mm', '1mm', 0, 1);//最左竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '10mm', trheight + newHeight + 9.37 + 'mm', '10mm', 0, 1);//行号后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '38mm', trheight + newHeight + 9.37 + 'mm', '38mm', 0, 1);//供货商后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '78mm', trheight + newHeight + 9.37 + 'mm', '78mm', 0, 1);//型号后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '96mm', trheight + newHeight + 9.37 + 'mm', '96mm', 0, 1);//型号后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '111mm', trheight + newHeight + 9.37 + 'mm', '111mm', 0, 1);//型号后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '129mm', trheight + newHeight + 9.37 + 'mm', '129mm', 0, 1);//颜色后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '149mm', trheight + newHeight + 9.37 + 'mm', '149mm', 0, 1);//单价后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '169mm', trheight + newHeight + 9.37 + 'mm', '169mm', 0, 1);//单价后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '201.55mm', trheight + newHeight + 9.37 + 'mm', '201.55mm', 0, 1);//最右竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight + 9.57 + 'mm', '1mm', trheight + newHeight + 9.57 + 'mm', '201.55mm', 0, 1);//每条数据后加一横线
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
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + 'mm', '2mm', '20.13mm', '5.37mm', '合    计');
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + 'mm', '80.54mm', '60.81mm', '5.37mm', '数量合计： ' + actualNum);
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + 'mm', '140.54mm', '60.81mm', '5.37mm', '金额合计： ' + totalPrice);
      //添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
      LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 10 + 'mm', '1mm', lastheght + table_hegth + 10 + 'mm', '201.55mm', 0, 1);// 标题下横线
      LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 'mm', '1mm', lastheght + table_hegth + 10 + 'mm', '1mm', 0, 1);//最左竖线
      LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 'mm', '201.55mm', lastheght + table_hegth + 10 + 'mm', '201.55mm', 0, 1);//最右竖线
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '2mm', '120.13mm', '7.37mm', '制单人：' + printArray[i].auditor);
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '52mm', '120.13mm', '7.37mm', '发货人：' + printArray[i].auditor);
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '102mm', '120.13mm', '7.37mm', '司机：');
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '152mm', '120.13mm', '7.37mm', '收货单位签收人：');
      LODOP.NewPage();
    }*/
  }

}
// 退货信息
const PrintReturn = (data, codetype, url, code) => {
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
    var r1, r2, m;
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
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

  LODOP.PRINT_INITA(0, 0, 210, 140, '210*140标签');
  LODOP.SET_PRINT_PAGESIZE(1, '210mm', '140mm', '');
  let fenyeSize = 140,
    num = 2;
  for (let i = 0; i < data.length; i++) {
    if (Math.ceil(data[i].returnOrderDetailVOS.length / 8) > 1) {
      var printNum = Math.ceil(data[i].returnOrderDetailVOS.length / 8)
      for (var a = 0; a < printNum; a++) {
        let bshi;
        let lastheght = 2;
        //设置文本，参数(距离页面头部，距离页面左边距离，文本宽度，文本高度，文本内容
        LODOP.ADD_PRINT_TEXT('4mm', '2mm', '201.55mm', '102mm', data[i].plaName + '退货单');
        LODOP.SET_PRINT_STYLEA(0, 'TextFrame', 8);
        LODOP.SET_PRINT_STYLEA(0, 'ItemType', 0);
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 20);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        let size = 10;
        let extendSize = 0;
        let table_hegth = (size + 1) * 25;
        let fonsize = 4;
        //上面的信息
        LODOP.SET_PRINT_STYLE('FontSize', 11);
        LODOP.ADD_PRINT_TEXT('12.20mm', '2mm', '60.13mm', '7.37mm', '退货单位：' + data[i].customer);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 1);
        LODOP.ADD_PRINT_TEXT('13.20mm', '69.54mm', '80.13mm', '7.37mm', '日期：' + data[i].createTime);
        LODOP.ADD_PRINT_TEXT('12.20mm', '140.54mm', '60.13mm', '7.37mm', '单号：' + data[i].returnOrderNum);
        LODOP.ADD_PRINT_TEXT('6.11mm', '140.54mm', '60.13mm', '7.37mm', '本单总页数：' + ' 第 ' + (a + 1) + ' 页 总：' + Math.ceil(data[i].returnOrderDetailVOS.length / 8));
        //标题等
        LODOP.SET_PRINT_STYLE('FontSize', 10);
        LODOP.ADD_PRINT_TEXT('22.15mm', '1mm', '11mm', '5.37mm', '序号');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '12mm', '26mm', '5.37mm', '产品代码');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '38mm', '40mm', '5.37mm', '产品名称');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '78mm', '18mm', '5.37mm', '规格型号');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '96mm', '15mm', '5.37mm', '单位');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '111mm', '18mm', '5.37mm', '实发数量');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '129mm', '20mm', '5.37mm', '单价');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '149mm', '20mm', '5.37mm', '金额');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('22.15mm', '169mm', '31mm', '5.37mm', '备注');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        //表格线
        LODOP.ADD_PRINT_LINE('19.31mm', '1mm', '19.31mm', '201.55mm', 0, 1);// 最上条标题横线
        LODOP.ADD_PRINT_LINE('28.31mm', '1mm', '28.31mm', '201.55mm', 0, 1);// 标题下横线
        LODOP.ADD_PRINT_LINE('19.31mm', '1mm', '28.11mm', '1mm', 0, 1);// 最左竖线

        //添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
        LODOP.ADD_PRINT_LINE('19.31mm', '10mm', '28.11mm', '10mm', 0, 1);  // 收款后竖线  序号
        LODOP.ADD_PRINT_LINE('19.31mm', '38mm', '28.11mm', '38mm', 0, 1);  // 起始日期后竖线      编码
        LODOP.ADD_PRINT_LINE('19.31mm', '78mm', '28.11mm', '78mm', 0, 1);  // 终止日期后竖线      名称
        LODOP.ADD_PRINT_LINE('19.31mm', '96mm', '28.11mm', '96mm', 0, 1);// 上次读数后竖线    规格
        LODOP.ADD_PRINT_LINE('19.31mm', '111mm', '28.11mm', '111mm', 0, 1);// 本次读数后竖线   单位
        LODOP.ADD_PRINT_LINE('19.31mm', '129mm', '28.11mm', '129mm', 0, 1);// 用量后竖线       实发数量
        LODOP.ADD_PRINT_LINE('19.31mm', '149mm', '28.11mm', '149mm', 0, 1);// 单价后竖线       单价
        LODOP.ADD_PRINT_LINE('19.31mm', '169mm', '28.11mm', '169mm', 0, 1);// 后后竖线      金额
        LODOP.ADD_PRINT_LINE('19.31mm', '201.55mm', '28.11mm', '201.55mm', 0, 1);// 后后竖线      备注

        //动态列表信息
        let trheight = 28.4;//用于每个竖线距离上面的固定长度
        let thHeight = 32;//用于每行距离上面的固定长度47.98
        let newHeight = 0;//用于动态增加一行的长度
        let lastSize = 0;//分页前的那个下标
        let aaa = '1234567890';
        let bbb = '1234567890';
        let ccc = '1234567';
        let actualNum = 0, totalPrice = 0;
        for (let k = 0; k < 8; k++) {
          newHeight = (k - lastSize) * 9.37 + extendSize * fonsize;
          let SizeTmpt = parseInt(getByteLen(aaa) / 35);
          if (parseInt(getByteLen(bbb) / 16) > SizeTmpt) {
            SizeTmpt = parseInt(getByteLen(bbb) / 16);
          }
          if (parseInt(getByteLen(ccc) / 17) > SizeTmpt) {
            SizeTmpt = parseInt(getByteLen(ccc) / 17);
          }
          LODOP.SET_PRINT_STYLE('FontSize', 10);
          if (((a + 1) * 8 - 8 + k) < data[i]['returnOrderDetailVOS'].length) {
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '9mm', '9mm', parseInt(1 + k));
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '11mm', '27mm', '12mm', data[i]['returnOrderDetailVOS'][((a + 1) * 8 - 8 + k)].goodCode);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '38mm', '40mm', '12mm', data[i]['returnOrderDetailVOS'][(a + 1) * 8 - 8 + k].goodName);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            if (fucCheckLength(data[i]['returnOrderDetailVOS'][(a + 1) * 8 - 8 + k].standard) > 8) {
              LODOP.ADD_PRINT_TEXT(thHeight + newHeight - 2.5 + 'mm', '78mm', '19mm', '12mm', data[i]['returnOrderDetailVOS'][(a + 1) * 8 - 8 + k].standard);
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            } else {
              LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '78mm', '19mm', '12mm', data[i]['returnOrderDetailVOS'][(a + 1) * 8 - 8 + k].standard);
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            }
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '96mm', '15mm', '12mm', data[i]['returnOrderDetailVOS'][(a + 1) * 8 - 8 + k].unitOfMea);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '111mm', '18mm', '12mm', data[i]['returnOrderDetailVOS'][(a + 1) * 8 - 8 + k].actualNum);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '129mm', '20mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '149mm', '20mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '169mm', '31mm', '12mm', data[i].remark);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            actualNum = Math.round((actualNum + parseInt(data[i]['returnOrderDetailVOS'][(a + 1) * 8 - 8 + k].actualNum)) * 100) / 100;
            /*  totalPrice = floatAdd(totalPrice, data[i]['returnOrderDetailVOS'][(a + 1) * 7 - 7 + k].totalPrice);*/
          } else {
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '9mm', '9mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '11mm', '27mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '38mm', '40mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '78mm', '19mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '96mm', '15mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '111mm', '18mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '129mm', '20mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '149mm', '20mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '169mm', '31mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          }
          extendSize += SizeTmpt;
          newHeight = (k - lastSize) * 9.37 + extendSize * fonsize;
          if (k == lastSize + 1 && k != 1) {
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight - SizeTmpt * fonsize + 'mm', '201.55mm', 0, 1);//每条数据后加一横线
          }
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight + 9.37 + 'mm', '1mm', 0, 1);//最左竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '10mm', trheight + newHeight + 9.37 + 'mm', '10mm', 0, 1);//行号后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '38mm', trheight + newHeight + 9.37 + 'mm', '38mm', 0, 1);//供货商后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '78mm', trheight + newHeight + 9.37 + 'mm', '78mm', 0, 1);//型号后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '96mm', trheight + newHeight + 9.37 + 'mm', '96mm', 0, 1);//型号后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '111mm', trheight + newHeight + 9.37 + 'mm', '111mm', 0, 1);//型号后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '129mm', trheight + newHeight + 9.37 + 'mm', '129mm', 0, 1);//颜色后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '149mm', trheight + newHeight + 9.37 + 'mm', '149mm', 0, 1);//单价后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '169mm', trheight + newHeight + 9.37 + 'mm', '169mm', 0, 1);//单价后竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '201.55mm', trheight + newHeight + 9.37 + 'mm', '201.55mm', 0, 1);//最右竖线
          LODOP.ADD_PRINT_LINE(trheight + newHeight + 9.57 + 'mm', '1mm', trheight + newHeight + 9.57 + 'mm', '201.55mm', 0, 1);//每条数据后加一横线
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
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + 'mm', '2mm', '20.13mm', '5.37mm', '合    计');
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + 'mm', '80.54mm', '60.81mm', '5.37mm', '数量合计： ' + actualNum);
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + 'mm', '140.54mm', '60.81mm', '5.37mm', '金额合计： ' + totalPrice);
        //添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
        LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 10 + 'mm', '1mm', lastheght + table_hegth + 10 + 'mm', '201.55mm', 0, 1);// 标题下横线
        LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 'mm', '1mm', lastheght + table_hegth + 10 + 'mm', '1mm', 0, 1);//最左竖线
        LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 'mm', '201.55mm', lastheght + table_hegth + 10 + 'mm', '201.55mm', 0, 1);//最右竖线
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '2mm', '120.13mm', '7.37mm', '制单人：' + data[i].auditor);
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '52mm', '120.13mm', '7.37mm', '退货人：' + data[i].auditor);
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '102mm', '120.13mm', '7.37mm', '司机：');
        LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '152mm', '120.13mm', '7.37mm', '收货单位签收人：');
        LODOP.NewPage();
      }
    } else {
      let lastheght = 2;
      //设置文本，参数(距离页面头部，距离页面左边距离，文本宽度，文本高度，文本内容
      LODOP.ADD_PRINT_TEXT('4mm', '2mm', '201.55mm', '102mm', data[i].plaName + '退货单');
      LODOP.SET_PRINT_STYLEA(0, 'TextFrame', 8);
      LODOP.SET_PRINT_STYLEA(0, 'ItemType', 0);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 20);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      let size = 10;
      let extendSize = 0;
      let table_hegth = (size + 1) * 25;
      let fonsize = 4;
      //上面的信息
      console.log(Math.ceil(data[i].returnOrderDetailVOS.length / 8))
      LODOP.SET_PRINT_STYLE('FontSize', 11);
      LODOP.ADD_PRINT_TEXT('12.20mm', '2mm', '60.13mm', '7.37mm', '退货单位：' + data[i].customer);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 1);
      LODOP.ADD_PRINT_TEXT('13.20mm', '69.54mm', '80.13mm', '7.37mm', '日期：' + data[i].createTime);
      LODOP.ADD_PRINT_TEXT('12.20mm', '140.54mm', '60.13mm', '7.37mm', '单号：' + data[i].returnOrderNum);
      LODOP.ADD_PRINT_TEXT('6.11mm', '140.54mm', '60.13mm', '7.37mm', '本单总页数：' + '第 1 页 总：' + Math.ceil(data[i].returnOrderDetailVOS.length / 8));
      //标题等
      LODOP.SET_PRINT_STYLE('FontSize', 10);
      LODOP.ADD_PRINT_TEXT('22.15mm', '1mm', '11mm', '5.37mm', '序号');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '12mm', '26mm', '5.37mm', '产品代码');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '38mm', '40mm', '5.37mm', '产品名称');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '78mm', '18mm', '5.37mm', '规格型号');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '96mm', '15mm', '5.37mm', '单位');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '111mm', '18mm', '5.37mm', '实发数量');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '129mm', '20mm', '5.37mm', '单价');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '149mm', '20mm', '5.37mm', '金额');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('22.15mm', '169mm', '31mm', '5.37mm', '备注');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      //表格线
      LODOP.ADD_PRINT_LINE('19.31mm', '1mm', '19.31mm', '201.55mm', 0, 1);// 最上条标题横线
      LODOP.ADD_PRINT_LINE('28.31mm', '1mm', '28.31mm', '201.55mm', 0, 1);// 标题下横线
      LODOP.ADD_PRINT_LINE('19.31mm', '1mm', '28.11mm', '1mm', 0, 1);// 最左竖线

      //添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
      LODOP.ADD_PRINT_LINE('19.31mm', '10mm', '28.11mm', '10mm', 0, 1);  // 收款后竖线  序号
      LODOP.ADD_PRINT_LINE('19.31mm', '38mm', '28.11mm', '38mm', 0, 1);  // 起始日期后竖线      编码
      LODOP.ADD_PRINT_LINE('19.31mm', '78mm', '28.11mm', '78mm', 0, 1);  // 终止日期后竖线      名称
      LODOP.ADD_PRINT_LINE('19.31mm', '96mm', '28.11mm', '96mm', 0, 1);// 上次读数后竖线    规格
      LODOP.ADD_PRINT_LINE('19.31mm', '111mm', '28.11mm', '111mm', 0, 1);// 本次读数后竖线   单位
      LODOP.ADD_PRINT_LINE('19.31mm', '129mm', '28.11mm', '129mm', 0, 1);// 用量后竖线       实发数量
      LODOP.ADD_PRINT_LINE('19.31mm', '149mm', '28.11mm', '149mm', 0, 1);// 单价后竖线       单价
      LODOP.ADD_PRINT_LINE('19.31mm', '169mm', '28.11mm', '169mm', 0, 1);// 后后竖线      金额
      LODOP.ADD_PRINT_LINE('19.31mm', '201.55mm', '28.11mm', '201.55mm', 0, 1);// 后后竖线      备注

      //动态列表信息
      let trheight = 28.4;//用于每个竖线距离上面的固定长度
      let thHeight = 32;//用于每行距离上面的固定长度47.98
      let newHeight = 0;//用于动态增加一行的长度
      let lastSize = 0;//分页前的那个下标
      let allProductNumber = 0;
      let aaa = '1234567890';
      let bbb = '1234567890';
      let ccc = '1234567';
      let actualNum = 0, totalPrice = 0;
      for (let k = 0; k < 8; k++) {
        newHeight = (k - lastSize) * 9.37 + extendSize * fonsize;
        let SizeTmpt = parseInt(getByteLen(aaa) / 35);
        if (parseInt(getByteLen(bbb) / 16) > SizeTmpt) {
          SizeTmpt = parseInt(getByteLen(bbb) / 16);
        }
        if (parseInt(getByteLen(ccc) / 17) > SizeTmpt) {
          SizeTmpt = parseInt(getByteLen(ccc) / 17);
        }
        LODOP.SET_PRINT_STYLE('FontSize', 10);
        if (k < data[i]['returnOrderDetailVOS'].length) {
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '9mm', '9mm', parseInt(1 + k));
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '11mm', '27mm', '12mm', data[i]['returnOrderDetailVOS'][k].goodCode);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '38mm', '40mm', '12mm', data[i]['returnOrderDetailVOS'][k].goodName);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          if (fucCheckLength(data[i]['returnOrderDetailVOS'][k].standard) > 8) {
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight - 2.5 + 'mm', '78mm', '19mm', '12mm', data[i]['returnOrderDetailVOS'][k].standard);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          } else {
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '78mm', '19mm', '12mm', data[i]['returnOrderDetailVOS'][k].standard);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          }
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '96mm', '15mm', '12mm', data[i]['returnOrderDetailVOS'][k].unitOfMea);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '111mm', '18mm', '12mm', data[i]['returnOrderDetailVOS'][k].actualNum);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '129mm', '20mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '149mm', '20mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '169mm', '31mm', '12mm', data[i].remark);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          actualNum = Math.round((actualNum + parseInt(data[i]['returnOrderDetailVOS'][k].actualNum)) * 100) / 100;
          /* totalPrice = floatAdd(totalPrice, data[i]['returnOrderDetailVOS'][k].totalPrice);*/
        } else {
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '9mm', '9mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '11mm', '27mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '38mm', '40mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '78mm', '19mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '96mm', '15mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '111mm', '18mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '129mm', '20mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '149mm', '20mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '169mm', '31mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        }
        extendSize += SizeTmpt;
        newHeight = (k - lastSize) * 9.37 + extendSize * fonsize;
        if (k == lastSize + 1 && k != 1) {
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight - SizeTmpt * fonsize + 'mm', '201.55mm', 0, 1);//每条数据后加一横线
        }
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight + 9.37 + 'mm', '1mm', 0, 1);//最左竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '10mm', trheight + newHeight + 9.37 + 'mm', '10mm', 0, 1);//行号后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '38mm', trheight + newHeight + 9.37 + 'mm', '38mm', 0, 1);//供货商后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '78mm', trheight + newHeight + 9.37 + 'mm', '78mm', 0, 1);//型号后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '96mm', trheight + newHeight + 9.37 + 'mm', '96mm', 0, 1);//型号后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '111mm', trheight + newHeight + 9.37 + 'mm', '111mm', 0, 1);//型号后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '129mm', trheight + newHeight + 9.37 + 'mm', '129mm', 0, 1);//颜色后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '149mm', trheight + newHeight + 9.37 + 'mm', '149mm', 0, 1);//单价后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '169mm', trheight + newHeight + 9.37 + 'mm', '169mm', 0, 1);//单价后竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '201.55mm', trheight + newHeight + 9.37 + 'mm', '201.55mm', 0, 1);//最右竖线
        LODOP.ADD_PRINT_LINE(trheight + newHeight + 9.57 + 'mm', '1mm', trheight + newHeight + 9.57 + 'mm', '201.55mm', 0, 1);//每条数据后加一横线
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
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + 'mm', '2mm', '20.13mm', '5.37mm', '合    计');
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + 'mm', '80.54mm', '60.81mm', '5.37mm', '数量合计： ' + actualNum);
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 4 + 'mm', '140.54mm', '60.81mm', '5.37mm', '金额合计： ' + totalPrice);
      //添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
      LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 10 + 'mm', '1mm', lastheght + table_hegth + 10 + 'mm', '201.55mm', 0, 1);// 标题下横线
      LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 'mm', '1mm', lastheght + table_hegth + 10 + 'mm', '1mm', 0, 1);//最左竖线
      LODOP.ADD_PRINT_LINE(lastheght + table_hegth + 'mm', '201.55mm', lastheght + table_hegth + 10 + 'mm', '201.55mm', 0, 1);//最右竖线
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '2mm', '120.13mm', '7.37mm', '制单人：' + data[i].auditor);
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '52mm', '120.13mm', '7.37mm', '退货人：' + data[i].auditor);
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '102mm', '120.13mm', '7.37mm', '司机：');
      LODOP.ADD_PRINT_TEXT(lastheght + table_hegth + 11 + 'mm', '152mm', '120.13mm', '7.37mm', '收货单位签收人：');
      LODOP.NewPage();
    }
  }
}
export {PrintSales, PrintSales2, PrintReturn}
