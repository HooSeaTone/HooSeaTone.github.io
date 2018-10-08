'use strict';
// -----------------------------------------------------------------------------------------------------------
// ---------------------------------------------Global  Variables --------------------------------------------
// -----------------------------------------------------------------------------------------------------------
var shw = $("#myShow");  //textarea
var solution = []; //解决方案，每个元素代表一个步骤，每个步骤包含若干参数，含义如下：
/*                   [
                     [itemA-left, itemB-left, itemC-left, itemA, itemB, itemC, containerNumber],
                     [...],
                   ]
                   */
var optimumSolution = []; //最优解决方案, 只保留一个
var endNumber = 0;
var containerNumber = -1;


// -----------------------------------------------------------------------------------------------------------
// ---------------------------------------------Basic function --------------------------------------------
// -----------------------------------------------------------------------------------------------------------

// to display
function dsp(txt) {
  var newStr = shw.html() + txt;
  shw.html(newStr);
  return;
}

// of two number, returns the smaller one
function min(a, b) {
  if (a >= b) {
    return b;
  } else {
    return a;
  }
}

// to deep copy arrays.
function deepCopy(obj) {
  var out = [], i = 0, len = obj.length;
  for (i = 0; i < len; i++) {
    if (obj[i] instanceof Array) {
      out[i] = deepCopy(obj[i]);
    } else {
      out[i] = obj[i];
    }
  }
  return out;
}

// -----------------------------------------------------------------------------------------------------------
// ---------------------------------------------Helper function --------------------------------------------
// -----------------------------------------------------------------------------------------------------------

// to display the solution
function displaySolution(solution) {
  var len = solution.length;
  var total = 0, i = 0;
  dsp('最优解决方案如下：');
  for (i = 1; i < len; i++) {
    total += solution[i][6];
    dsp('\n\n步骤' + i + ',  竹篮盛放鸡蛋:' + solution[i][3] + ',  竹篮盛放橙子:' + solution[i][4] +
      ',  竹篮盛放柚子:' + solution[i][5] + ',  本步需要竹篮:' + solution[i][6]);
    dsp('\n累计已使用竹篮' + total + ',  尚有鸡蛋:' + solution[i][0] + ',  尚有橙子:' + solution[i][1] +
      ',  尚有柚子:' + solution[i][2]);
  }
  return;
}

// whether the solution is completed
function isCompleted(solution) {
  var end = solution.length - 1;
  if (solution[end][0] == 0 && solution[end][1] == 0 && solution[end][2] == 0) {
    return true;
  } else {
    return false;
  }
}

// total container of the solution
function containerNumberOfSolution(solution) {
  var len = solution.length;
  var total = 0;
  for (let i = 0; i < len; i++) {
    total += solution[i][6];
  }
  return total;
}

//whether items in container are permitted under limits.
function isValid(Na, Nb, Nc, Wa, Wb, Wc, N_limit, W_limit) {
  if (Na + Nb + Nc <= N_limit && Na * Wa + Nb * Wb + Nc * Wc <= W_limit) {
    return true;
  } else {
    return false;
  }
}

// How many containers untill any of items is not enough, given load option
function nTillNotEnough(Na, Nb, Nc, Ca, Cb, Cc) {
  var n, i;
  var nlist = [];
  if (Ca == 0 && Cb == 0 && Cc == 0) {
    return -1;
  }

  if (Ca != 0) {
    n = parseInt(Na / Ca);
    nlist.push(n);
  }
  if (Cb != 0) {
    n = parseInt(Nb / Cb);
    nlist.push(n);
  }
  if (Cc != 0) {
    n = parseInt(Nc / Cc);
    nlist.push(n);
  }

  n = nlist[0];
  for (i = 1; i < nlist.length; i++) {
    n = min(n, nlist[i]);
  }

  return n;
}


// --- Scroll to top helper  
function scrollToTop() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
}

// -----------------------------------------------------------------------------------------------------------
// -------------------------------------------------- Main function --------------------------------------------
// -----------------------------------------------------------------------------------------------------------
// a brutal recursive method.
function toCarryItem(Na, Nb, Nc, Wa, Wb, Wc, N_limit, W_limit) {
  //dsp('Keep on ...');
  var NaStop = min(parseInt(W_limit / Wa), Na);
  var NaStop = min(NaStop, N_limit);
  var NbStop = min(parseInt(W_limit / Wb), Nb);
  var NbStop = min(NbStop, N_limit);
  var NcStop = min(parseInt(W_limit / Wc), Nc);
  var NcStop = min(NcStop, N_limit);
  for (let i = 0; i <= NaStop; i++) {
      for (let j = 0; j <= NbStop; j++) {
          for (let k = 0; k <= NcStop; k++) {

              if (i == 0 && j == 0 && k == 0) {continue;}
              
              if (isValid(i, j, k, Wa, Wb, Wc, N_limit, W_limit)) {
                  var n = nTillNotEnough(Na, Nb, Nc, i, j, k);
                  solution.push([Na - n * i, Nb - n * j, Nc - n * k, i, j, k, n]);                  
                  if (isCompleted(solution)) {
                      endNumber += 1;
                     
                      var Nct = containerNumberOfSolution(solution);
                      if (containerNumber == -1 || containerNumber > Nct) {
                          containerNumber = Nct;
                          optimumSolution = deepCopy(solution);
                      }
                  } else {                    
                      toCarryItem(Na - n * i, Nb - n * j, Nc - n * k, Wa, Wb, Wc, N_limit, W_limit);
                  }
                  solution.pop();

              } else {
                  ;
              }
          }
      }
  }
  return;
}


// Accquire inputs and perform analysis.
function FindMinimum() {
  var Na = $('#ItemANumber').val();
  var Nb = $('#ItemBNumber').val();
  var Nc = $('#ItemCNumber').val();
  var Wa = $('#ItemAWeight').val();
  var Wb = $('#ItemBWeight').val();
  var Wc = $('#ItemCWeight').val();
  var N_limit = $('#ContainerNumberLimit').val();
  var W_limit = $('#ContainerWeightLimit').val();

  var tem = [];
  solution = deepCopy(tem); // clean up the solution
  optimumSolution = deepCopy(tem); // clean up the solution
  endNumber = 0;
  containerNumber = -1;
  shw.html('');

  solution.push([Na, Nb, Nc, 0, 0, 0, 0]);

  toCarryItem(Na, Nb, Nc, Wa, Wb, Wc, N_limit, W_limit);
  displaySolution(optimumSolution);

  return;
}