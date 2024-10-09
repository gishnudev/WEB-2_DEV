
try{
    //code that might throw an error
    let result = riskyoperation();
    console.log(result);

}
catch(error){
    //code that handle error
    console.log('An error occurdd: '+error.message);

}
finally{
    //code that regardless of an error
    console.log('This will always run')

}
function riskyoperation(){
    let obj;
    obj.property;
}