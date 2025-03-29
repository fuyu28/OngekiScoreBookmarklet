javascript:(function getSongData() {
  const element = document.getElementsByClassName("basic_btn");
  let csvContent = "";

  // データを整形する関数
  const cleanData = (data) => data.replace(/[\s,]+/g, '');

  // CSV行を作成する関数
  const createCsvRow = (dataArray) => `"${dataArray.join('","')}"\n`;

  // 新曲枠とベスト枠のデータを処理
  const processSongs = (start, end, header) => {
    csvContent += `${header}\nNo,songName,difficulty,level,score\n`;
    let No = 1;
    for (let i = start; i < end; i++) {
      const songData = element[i].innerText.split("\n");
      const difficulty = element[i].classList[1].replace("_score_back", "");
      const level = cleanData(songData[0]);
      const songName = cleanData(songData[1]);
      const score = cleanData(songData[3]);
      csvContent += createCsvRow([No, songName, difficulty, level, score]);
      No++;
    }
    csvContent += "\n"; // 各セクションの間に空行を追加
  };

  // Pスコア枠のデータを処理
  const processPScore = (start, end, header) => {
    csvContent += `${header}\nNo,songName,difficulty,level,☆,%,score,max\n`;
    let No = 1;
    for (let i = start; i < end; i++) {
      const songData = element[i].innerText.split("\n");
      const difficulty = element[i].classList[1].replace("_score_back", "");
      const level = cleanData(songData[0]);
      const songName = cleanData(songData[1]);
      const star = cleanData(songData[3]);
      const scoreOrigin = songData[4].split("/");
      const score = cleanData(scoreOrigin[0]);
      const max = cleanData(scoreOrigin[1]);
      const percentage = (100 * parseFloat(score) / parseFloat(max)).toFixed(2);
      csvContent += createCsvRow([No, songName, difficulty, level, star, percentage, score, max]);
      No++;
    }
  };

  // 各枠の処理を実行
  processSongs(0, 10, "新曲枠");
  processSongs(10, 60, "ベスト枠");
  processPScore(60, 110, "Pスコア枠");

  // CSVファイルを生成してダウンロード
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `score_${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
})();