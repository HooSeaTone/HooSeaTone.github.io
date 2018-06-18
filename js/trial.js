var height = parseFloat(prompt("请输入身高（m）："));
var weight = parseFloat(prompt("请输入体重（kg）："));
var BMI = weight / (height * height);

function evaluateBMI ( _BMI ) {
	if ( _BMI <= 18.5 ) {
		console.log("您的体重属于过轻(BMI 0～18.5）");	
	} else if ( _BMI > 18.5 && _BMI <= 25 ) {
		console.log("您的体重属于正常(BMI 18.5～25）");
	} else if ( _BMI > 25 && _BMI <= 28 ) {
		console.log("您的体重属于过重(BMI 25～28）");
	} else if ( _BMI > 28 && _BMI <= 32 ) {
		console.log("您的体重属于肥胖(BMI 28～32）");
	} else {
		console.log("您的体重属于严重肥胖(BMI 32～ ）");
	}
}
 
if ( isUndefined(BMI) ) {
	console.log("未正常获得_BMI指数。");
} else {
	evaluateBMI(BMI);
}



	
