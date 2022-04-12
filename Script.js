var autoEvolve = true;

function create(){
    var count =1;
    var incremental =0;
    // for (var i =1; i < 20 ; i++){
    //     incremental += 10
    //     for (var j =1; j < 20 ; j++){
    //         var div = document.createElement("div");
    //         div.className = 'grid-item';
    //         div.innerHTML = ""+i+j;
    //         div.id= ""+i+j;
    //         document.getElementById("grid-container").appendChild(div);
    //         //console.log(count);
    //         count++;
    //     }
        
    // }
    for (var i=1; i<401; i++){
            var div = document.createElement("div");
            div.className = 'grid-item';
            //div.innerHTML = i;
            div.id= i;
            document.getElementById("grid-container").appendChild(div);
    }


}
create();

function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}

// ------------ UNION ----------------
var toPush = [];

function getUnion(a, n, b, m) {

   // Defining set container s
   var s = new Set();

   // Inserting array elements in s
   for (let i = 0; i < n; i++)
       s.add(a[i]);

   for (let i = 0; i < m; i++)
       s.add(b[i]);
//    document.write(
//    "Number of elements after union operation: "
//    + s.size + "<br>");
//    document.write("The union set of both arrays is :");
//    document.write("<br>");
   var arr = [];
   for (let itr of s)
       arr.push(itr);
   // s will contain only distinct
   // elements from array a and b
   arr.sort(function (a, b) { return a - b; })
   for (let i = 0; i < arr.length; i++) {
    //    document.write(arr[i] + " ");
    toPush.push(arr[i] + " ");
   }
}

// ------------ INTERSECTION ---------

var intersected = []

function intersection(a,b,n,m){
let i = 0, j = 0;
intersected =[];
while (i < n && j < m)
{
    if (a[i] > b[j])
    {
        j++;
    }
    else if (b[j] > a[i])
    {
        i++;
    }
    else
    {
        // when both are equal
        //document.write(a[i] + " ");
        //console.log(a[i] + " ");
        
        intersected.push(a[i] + " ");
        i++;
        j++;
    }
}
console.log(intersected);
}

var selected = [] 

document.querySelectorAll('.grid-item').forEach(item => {
    console.log();
    item.addEventListener('click', event => {
        console.log('hello');
        
        var sel_id = item.id;
        //console.log(selected + ' before push');
        if (selected.indexOf(sel_id) == -1){
            item.style.backgroundColor = "rgb(255,255,255)";
            // changeColor([219, 68, 55], sel_id);
            item.style.backgroundColor = "#DB4437";
            selected.push(sel_id);
        }
        else if (toPush.indexOf(sel_id) == -1 && selected.indexOf(sel_id) != -1){
            disable(sel_id);
            selected = selected.filter((ob)=>{ return ob != sel_id })
            console.log(selected);
        }
        
        // console.log(selected);
        //console.log(selected + 'ENNDDD');
    })
  })

function reset(){
    document.querySelectorAll('.grid-item').forEach(item => {
            item.style.backgroundColor = "";
            selected = [];
            intersected=[];
            newselected =[];
            toPush=[];
            neighbouring = [];
            ind_neighbouring = [];
            intersected =[];
            console.clear(); 
      })
}

function enable(){

}


function getrgbarray(string){
    var rgb = string.substring(4, string.length-1)
            .replace(/ /g, '')
            .split(',');
    return rgb;
}

function changeColor(endcolor, id){
    var element = document.getElementById(id);
    var startcolor = getrgbarray(element.style.backgroundColor);
    console.log(startcolor);
    var steps = 10;
    var red_change = (startcolor[0] - endcolor[0]) / steps;
    var green_change = (startcolor[1] - endcolor[1]) / steps;
    var blue_change = (startcolor[2] - endcolor[2]) / steps;

    var currentcolor = startcolor;
    var stepcount = 0;
    var timer = setInterval(function(){
        currentcolor[0] = parseInt(currentcolor[0] - red_change);
        currentcolor[1] = parseInt(currentcolor[1] - green_change);
        currentcolor[2] = parseInt(currentcolor[2] - blue_change);
        element.style.backgroundColor = 'rgb(' + currentcolor.toString() + ')';
        stepcount += 1;
        if (stepcount >= steps) {
            element.style.backgroundColor = 'rgb(' + endcolor.toString() + ')';
            clearInterval(timer);
        }
    }, 50);
}

function disable(id){
    console.log("disable -> id", id)
    document.getElementById(id).style.backgroundColor = '';
    // changeColor([255,255,255], id);
    // $("#"+id).fadeOut();
    console.log('color changes here');
}



function Evolve(){
    selected.sort();
    console.log(selected);
    len = selected.length;
    var neighbouring = []
    var ind_neighbouring =[]
    for(x=0 ; x<len ; x++ ) {
        
        console.log(x);
    
        var x_id = document.getElementById(selected[x]).id ;
        //r_id = parseInt(x_id) + 1;
        //console.log(r_id);
        var right = document.getElementById(parseInt(x_id) + 1) ;
        var left = document.getElementById(parseInt(x_id) -1);
        var down = document.getElementById(parseInt(x_id) +20);
        var up = document.getElementById(parseInt(x_id) -20);
        var upright = document.getElementById(parseInt(x_id) -19);
        var upleft = document.getElementById(parseInt(x_id) -21);
        var downleft = document.getElementById(parseInt(x_id) +19);
        var downright = document.getElementById(parseInt(x_id) +21);

        //console.log(right.id + "," + left.id + "," + up.id + "," + down.id + "," + upright.id + "," + upleft.id + "," + downright.id + "," + downleft.id ) ;
        neighbouring = [ ...neighbouring, right.id ,  left.id  ,  up.id  ,  down.id  ,  upright.id  ,  upleft.id  ,  downright.id , downleft.id ]
        //ind_neighbouring = [ ...ind_neighbouring, right.id ,  left.id  ,  up.id  ,  down.id  ,  upright.id  ,  upleft.id  ,  downright.id , downleft.id ]
        ind_neighbouring = [ right.id ,  left.id  ,  up.id  ,  down.id  ,  upright.id  ,  upleft.id  ,  downright.id , downleft.id ]
        
        ind_neighbouring.sort();
        selected.sort();

        console.log('before intersection');
        console.log(ind_neighbouring);
        console.log(selected);


        intersection(ind_neighbouring,selected,ind_neighbouring.length,selected.length);

        if(intersected.length == 0){
        //neighbouring = [ ...neighbouring, x_id, right.id ,  left.id  ,  up.id  ,  down.id  ,  upright.id  ,  upleft.id  ,  downright.id , downleft.id ]
        ind_neighbouring = [ ...ind_neighbouring, x_id];
        console.log("zero inter ", ind_neighbouring);

        }
        else{               
        console.log( x_id + "  " +  ind_neighbouring);
        }

        console.log( "totall " + neighbouring );

        //console.log(left.id);
        //console.log(down.id);
        //console.log(up.id);
        //console.log(upright.id);
        //console.log(upleft.id);
        //console.log(downleft.id);
        //console.log(downright.id);
        if(x==0){
        var newselected = selected;
        }
        console.log(intersected.length);
        if( intersected.length <=1 ){
            disable(x_id)
            newselected = newselected.filter((ob)=>{ return ob != selected[x] })
            console.log("newselected", newselected)
        }
        if (intersected.length >= 4){
            disable(x_id)
            newselected = newselected.filter((ob)=>{ return ob != selected[x] })
            console.log("newselected", newselected);
        }
        
        

    }

    console.log("newselected", newselected)
    selected = newselected;
    console.log(selected + ' after loop');


    

    var itemcount = {}
    neighbouring.forEach((obj)=>{
        itemcount[obj] = (itemcount[obj] || 0)+1
    })
    var newitemcount = {}

    console.log("itemcount", itemcount);
    var newitemcount = Object.fromEntries(Object.entries(itemcount).filter(([key, value])=>{return value == 3}));
    console.log("newitemcount", newitemcount);
    // var newselected = selected
    // for (obj in selected){
    //     if (itemcount[selected[obj]] <= 1){
    //         // delete from list
    //         disable(selected[obj])
    //         newselected = newselected.filter((ob)=>{ return ob != selected[obj] })
    //         console.log("newselected", newselected)

    //     }
    //     if (itemcount[selected[obj]] >= 4){
    //         // delete from list
    //         disable(selected[obj])
    //         newselected = newselected.filter((ob)=>{ return ob != selected[obj] })
    //         console.log("newselected", newselected)
    //     }
    // }

    
    for( obj in newitemcount){
        toPush.push(obj);
    }

    // for (obj in selected){
    //     if (itemcount[selected[obj]] <= 1){
    //        // delete from list
    //          disable(selected[obj])
    //          newselected = newselected.filter((ob)=>{ return ob != selected[obj] })
    //          console.log("newselected", newselected)

    //    }
    //     if (itemcount[selected[obj]] >= 4){
    //         // delete from list
    //          disable(selected[obj])
    //       newselected = newselected.filter((ob)=>{ return ob != selected[obj] })
    //          console.log("newselected", newselected)
    //     }
    // }
    
    getUnion(toPush,toPush.length,selected,selected.length);
    console.log(toPush);
    selected = [];
    for (x=0; x< toPush.length ; x++){
        //console.log(document.getElementById(parseInt(toPush[x])));
        document.getElementById(parseInt(toPush[x])).click();
    }
    console.log("selected", selected)
    toPush = [];
    wait(150);
    if(autoEvolve == true){
        requestAnimationFrame(Evolve);
    }
}   


