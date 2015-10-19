function wrap(target, name, descriptor, wrapper) {
  let oldFn = descriptor.value;
  let newFn = () => wrapper(oldFn, arguments);
  descriptor.value = newFn;
  return descriptor;
}

function logger(target, name, descriptor) {
  return wrap(target, name, descriptor, function(oldFn, args) {
    console.log('staring %s', name);
    oldFn.apply(target, args);
    console.log('ending %s', name);
  });
}

let test = {
  @logger
  logMe() {
    console.log('I want to be logged');
  }
};

test.logMe();