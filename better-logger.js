
let example = {
  @logger('custom message starting %s', 'custom message ending %s')
  logMe() {
    console.log('I want to be logged');
  }
};


// Decorator function for logging that accepts custom arguments
function logger(startMsg, endMsg) {
  return function(target, name, descriptor) {

    // obtain the original function
    let fn = descriptor.value;

    // create a new function that sandwiches
    // the call to our original function between
    // two logging statements
    let newFn  = function() {
      console.log(startMsg, name);
      fn.apply(target, arguments);
      console.log(endMsg, name);
    };

    // we then overwrite the origin descriptor value
    // and return the new descriptor
    descriptor.value = newFn;
    return descriptor;
  }
}


example.logMe();