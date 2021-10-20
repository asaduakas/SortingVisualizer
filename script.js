var bodyContainer = document.querySelector('#bodyContainer'),
    children = bodyContainer.children,
    slider = document.querySelector('#slider'),
    select = document.querySelector('#select'),
    size, delay, arraySize;

function getRandomInt() {
  min = Math.ceil(1);
  max = Math.floor(210);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function generateArray(size) {
    bodyContainer.innerHTML = '';
    for(i = 0; i < size; i++){
        val = getRandomInt();
        textVal = val.toString();
        const newDiv = document.createElement('div');
        newDiv.classList.add("arrElement");
        if(size < 25){
            const newContent = document.createTextNode(textVal);
            newDiv.appendChild(newContent);
        }
        newDiv.style.height = ((val * 3) + "px");
        newDiv.style.width = (((1 / size) * 500) + "px");
        bodyContainer.appendChild(newDiv);
    }
}

document.getElementById("sortBtn").addEventListener("click", function() {
    if(bodyContainer.children.length === 0){
        alert("Please choose array length or generate an array!");
    }
    else if(select.value === ""){
        alert("Please choose a sorting algorithm!");
    }
    else{
        size = document.getElementById("slider").valueAsNumber;
        delay = (1/size) * 2750;
        switch (select.value) {
      case "bubble":
          bubbleSort();
          break;
      case "heap":
          heapSort(children);
          break;
      case "quick":
          quickSort(children,0,size-1);
          break;       
      default:
          break;
  }
    }
});

async function bubbleSort() {
    console.log("Running Bubbles");
    var i, j;
    var n = size - 1;
    var isSwapped = false;
    
    for(i =0; i < n; i++){
        isSwapped = false;
        for(j = 0; j < n; j++){
            var child1 = children[j];
            var child2 = children[j+1];

            child1.style.backgroundColor = "yellow";
            child2.style.backgroundColor = "yellow";

            await sleep(delay);

            var val1 = parseInt(child1.style.height) / 3;
            var val2 = parseInt(child2.style.height) / 3;

            if(val1 > val2){
                child1.style.backgroundColor="red";
                child2.style.backgroundColor="green";
                await sleep(delay);
                
                var temp = bodyContainer.replaceChild(child2, child1);
                bodyContainer.insertBefore(temp, bodyContainer.children[j+1]);
                isSwapped = true;
            }

            child1.style.backgroundColor = "green";
            child2.style.backgroundColor = "green";

        }
        child1.style.backgroundColor="green";
        if(!isSwapped){
            break;
        }
    }
    children[0].style.backgroundColor="green";
}

async function quickSort(children, l, r){
    var index = await partition(children, l, r);
    if(l < index-1){
        quickSort(children,l,index-1);
    }
    if(index < r){
        quickSort(children, index, r);
    }
    children[0].style.backgroundColor = "green";
}

async function heapSort(children) {
    arraySize = size;
    console.log("Running heaps");

    for(var i = Math.floor(arraySize / 2); i>=0; i-=1){
        await heapify(children,i);
    }

    for(i = size-1; i>0;i--){
        swap(children,0,i);
        arraySize--;
        children[i].style.backgroundColor = "green";
        await heapify(children,0);
    }
    children[0].style.backgroundColor = "green";
}


//---------HELPERS-----------
async function heapify(children, i){
    var l = 2*i + 1;
    var r = 2*i + 2;
    var max = i;

    if(l < arraySize && (parseInt(children[l].style.height) / 3) > (parseInt(children[max].style.height) / 3)){
        children[l].style.backgroundColor = "yellow";
        max = l;
        await sleep(delay);
    }

    if(r < arraySize && (parseInt(children[r].style.height)/3) > (parseInt(children[max].style.height)/3) ){
        children[l].style.backgroundColor = "yellow";
        max = r;
        await sleep(delay);
    }

    if(max != i){
        children[i].style.backgroundColor = "red";
        children[max].style.backgroundColor = "red";
        await sleep(delay);
        swap(children, i, max);
        await heapify(children, max);
    }
}

async function partition(children, l, r){
    var pivotElement = children[Math.floor((r+l)/2)],
        pivot = parseInt(pivotElement.style.height) / 3,
        i = l,
        j = r;
    pivotElement.style.backgroundColor = "green";
    await sleep(delay);
    while (i <= j) {
        children[i].style.backgroundColor = "yellow";
        await sleep(delay);
        while((parseInt(children[i].style.height) / 3) < pivot){
            i++;
            children[i].style.backgroundColor = "green";
            await sleep(delay);
        }
        children[j].style.backgroundColor = "yellow";
        while((parseInt(children[j].style.height) / 3) > pivot){
            children[j].style.backgroundColor = "green";
            await sleep(delay);
            j--;
        }
        if(i <= j){
            children[i].style.backgroundColor = "red";
            children[j].style.backgroundColor = "yellow";
            await sleep(delay);
            swap(children,i,j);
            await sleep(delay);
            children[i].style.backgroundColor = "green";
            children[j].style.backgroundColor = "green";
            i++;
            j--;
        }
    }
    return i;
}

function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

function swap(children, l, r) {
    var temp = bodyContainer.replaceChild(children[l], children[r]);
    bodyContainer.insertBefore(temp, bodyContainer.children[l]);
}