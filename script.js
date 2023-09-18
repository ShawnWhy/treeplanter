var treeColor = "cadetBlue";
var branchFractal = 6;
var degrees = 100;
var mouseLeft = 500;

 var red = Math.floor(Math.random() * 250 + 100);
 var green = Math.floor(Math.random() * 100 + 60);
 var blue = Math.floor(Math.random() * 50 + 20);

 

function createLeaves(leafColor, parent){

let branches = $(parent).find(".branch, .branch1, .branch2");
console.log("Branches")
console.log(branches);
for(i=0; i<branches.length; i++){
  let rand = Math.floor(Math.random() * 3);
  let randSize = Math.floor(Math.random() * 80 + 30);

  if (rand>=2){

    let leaf = $("<div>")
    leaf.addClass("leaf");
    leaf.css("background-color", leafColor)
    leaf.css("height", randSize);
    leaf.css("width", randSize);
    $(branches[i]).append(leaf);


  }


}

}

function growbranches(parentbranch) {
  for (let i = 0; i < 5; i++) {
    let branch1 = $("<div>");

    let number2 = Math.floor(Math.random() * 40 + 60);

    let number3 = Math.floor(Math.random() * 3);
        // $(branch1).addClass("branch");


    switch (number3) {
      case 0:
        $(branch1).addClass("branch");

        break;
      case 1:
        $(branch1).addClass("branch1");

        break;
      case 2:
        $(branch1).addClass("branch2");

        break;

      default:
        break;
    }


    $(branch1).addClass("branch" + branchFractal);

    $(branch1).css("transform", "rotate(" + (-100 + 45 * i) + "deg)");
    $(branch1).css("background-color", treeColor);
    $(branch1).css("z-index", i);
    $(branch1).css("left", i * 2 + "%");
    $(branch1).css("bottom", number2 + "%");
    $(parentbranch).append(branch1);
  }
}

function growFruit(div) {
  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      var XLen = Math.floor(Math.random() * 180 - 40 );
      var YLen = Math.floor(Math.random() * 60 - 40);
      var appleSize = Math.floor(Math.random() * 20 + 5);

      let redRand = Math.floor(Math.random() * 100-40);
      let greenRand = Math.floor(Math.random() * 100-40);
      let blueRand = Math.floor(Math.random() * 100-40);

   
      appleColor = "rgb(" + (red+redRand) + "," + (green+greenRand) + "," + (blue+blueRand) + ")";

      var apple2 = $("<div>");
      apple2.addClass("apple2");
      apple2.css("background-color", appleColor);
      apple2.css("left", XLen + "%");
      apple2.css("top", YLen + "%");
      apple2.css("width", appleSize + "%");
      apple2.css("padding-top", appleSize + "%");

      $(div).append(apple2);
    }, i * 50);
  }
}

function selectAndGrow(i, div) {
  branchFractal--;
  // var branches = $(".branch" + i);
  var branches = $(div).find(".branch"+i)
  for (i = 0; i < branches.length; i++) {
    growbranches(branches[i]);
  }
}

function growTree(mouseLeft) {
  console.log("mouseleft")
  console.log(mouseLeft)
  var randTop = Math.floor(Math.random()*50)
  // $('.ground').html('')
  var bulk = $("<div>");
  bulk.addClass("bulk");
  $(bulk).css("background-color", treeColor);
  var treeContainer = $("<div>");
  $(treeContainer).addClass("treeContainer");
  $(treeContainer).css("left", mouseLeft);
  $(treeContainer).css("z-index", randTop);

    $(treeContainer).css("top", randTop + "%");

  $(treeContainer).append(bulk);
  $(".ground").append(treeContainer);

  setTimeout(() => {
    growbranches(bulk);
    setTimeout(() => {
      selectAndGrow(branchFractal, bulk);
      setTimeout(() => {
        selectAndGrow(branchFractal, bulk);
        setTimeout(() => {
          createLeaves("rgb("+red+","+green+","+blue+")", bulk)
          setTimeout(() => {
            growFruit(treeContainer);
          }, 1000);
        }, 400);
      }, 400);
    }, 400);
  }, 500);
}

window.addEventListener("mousemove", (event) => {
  mouseLeft = event.clientX;
  mouseTop = event.clientY;
  $(".apple").css("top", mouseTop - 20 + "px");
  $(".apple").css("left", mouseLeft - 20 + "px");
  // console.log(mouseTop);
});
growTree(mouseLeft);


$(document).on('click','.apple', event=>{
  event.preventDefault();
  event.stopPropagation();
  growTree(mouseLeft - 200)

})

$(document).on('click','.apple2', event=>{

  event.preventDefault();
  event.stopPropagation();
  var color = $(event.target).css("background-color")
  console.log("apple2color");
  console.log(color);
  $(event.target).remove();
  var newApple = $("<div>");
  newApple.addClass("apple");
  newApple.css("background-color", color)
  $('body').append(newApple);
  var colors1 = color.split("rgb(")[1]
  console.log("colors1")
  console.log(colors1)

  var colors2 = colors1.split(",")
  console.log(colors2)

  red = parseInt(colors2[0])
  green= parseInt(colors2[1])
  blue= colors2[2].split(")")
  blue = parseInt(blue[0]);

  
  
});
