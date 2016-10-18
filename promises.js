var promise = {
  isDone: false,
  doneHandler: null,
  done: function(f) {
    f();
  } else {
    this.doneHandler = f;
  }
},
callDone: function() {
  if (this.doneHandler != null) {
    this.doneHandler();
  } else {
    this.isDone = true;
  }
}