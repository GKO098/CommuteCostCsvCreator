function get_yyyymmdd(delimeter) {
    const today = new Date()
    var yyyy = today.getFullYear();
    var mm = ('0' + (today.getMonth() + 1)).slice(-2);
    var dd = ('0' + today.getDate()).slice(-2);
    return (yyyy + delimeter + mm + delimeter + dd);
  }

function download_csv(){    
    // header
    output_data = 'カードID=0000000000000000\n';
    output_data += '利用年月日,定期,鉄道会社名,入場駅/事業者名,定期,鉄道会社名,出場駅/降車場所,利用額(円),残額(円),メモ\n';


    const now = new Date();
    const OLDEST_DATE = new Date()
    OLDEST_DATE.setMonth(now.getMonth() - 1)
    OLDEST_DATE.setDate(1)
    for (let date = OLDEST_DATE; date <= now; date.setDate(date.getDate() + 1)) {
        // 平日なら
        if (date.getDay() != 0 && date.getDay() != 6) {
            date_yyyymmdd = date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2);
            output_data += `${date_yyyymmdd},,${company_in.value},${station_in.value},,${company_out.value},${station_out.value},${price.value},,\n`
            output_data += `${date_yyyymmdd},,${company_out.value},${station_out.value},,${company_in.value},${station_in.value},${price.value},,\n`
        }
    }
    // shift-jisに変換
    unicodeArray = Encoding.stringToCode(output_data);
    convert = Encoding.convert(unicodeArray, {to: 'SJIS', from: 'UNICODE'});
    u8a = new Uint8Array(convert);

    // ダウンロード関連
    let bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    let blob = new Blob([u8a], {'type' : 'text/csv'});
    
    
    let downloadLink = document.createElement('a');
    downloadLink.download = '通勤費_' + get_yyyymmdd("") + '.csv';
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.dataset.downloadurl = ['text/plain', downloadLink.download, downloadLink.href].join(':');
    downloadLink.click();
};
