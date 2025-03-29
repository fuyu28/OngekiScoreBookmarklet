javascript:(function getRating() {
  let element = document.getElementsByClassName("basic_btn");

  let csvContent = "songName,level,difficulty,score\n";
  for (let i = 0; i < element.length; i++) {
    let songData = element[i].innerText.split("\n");
    let difficulty = element[i].classList[1].replace("_score_back", "");

    if (i === 10 || i === 60) csvContent += "\n";
    let level = songData[0].replace(/^\s+|\s+$/g, '');
    let songName = songData[1].replace(/^\s+|\s+$/g, '');
    let score = songData[3].replace(/^\s+|\s+$/g, '');
    csvContent += `"${songName}","${difficulty}","${level}","${score}"\n`;
  }

  let blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  let link = document.createElement("a");
  let url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `score_${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
})();