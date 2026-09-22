export interface Identity {
  clientId: string;
  counter: number;
}

export const compareIds = (tee: Identity, tay: Identity): number => {
  if (tee.counter > tay.counter) {
    return 1;
  } else if (tee.counter < tay.counter) {
    return -1;
  } else {
    if (tee.clientId > tay.clientId) {
      return 1;
    } else if (tee.clientId < tay.clientId) {
      return -1;
    } else {
      return 0;
    }
  }
};

// export const compareIds = (tee: Identity, tay: Identity): number => {
//   if (tee.counter !== tay.counter) {
//     return tee.counter - tay.counter;
//   }

//   if (tee.clientId !== tay.clientId) {
//     return tee.clientId > tay.clientId ? 1 : -1;
//   }

//   return 0;
// };
