import Swal from "sweetalert2";

interface IAlert {
  title: string;
  text: string;
  handler: any;
  payload?: any;
  parentTitle?: string;
  parentText?: string;
  submitText?: string;
  cancelText?: string;
  cancelDialogTitle?: string;
  cancelDialogText?: string;
}
interface screenDimensionsObject {
  availHeight: number;
  availWidth: number;
}

export const dateFormat = (date: Date, withoutTime?: boolean) => {
  const newData = new Date(date);
  const numberWithTwoDigits = {
    minimumIntegerDigits: 2,
    useGrouping: false,
  };

  const year = newData.getFullYear();
  const month = newData.getMonth() + 1;
  const day = newData.getDate();
  const hour = newData.getHours();
  const minute = newData.getMinutes();
  const second = newData.getSeconds();

  if (!withoutTime) {
    return `${year}-${month.toLocaleString(
      "en-US",
      numberWithTwoDigits
    )}-${day.toLocaleString(
      "en-US",
      numberWithTwoDigits
    )} ${hour.toLocaleString(
      "en-US",
      numberWithTwoDigits
    )}:${minute.toLocaleString(
      "en-US",
      numberWithTwoDigits
    )}:${second.toLocaleString("en-US", numberWithTwoDigits)}`;
  } else {
    return `${year}-${month.toLocaleString(
      "en-US",
      numberWithTwoDigits
    )}-${day.toLocaleString("en-US", numberWithTwoDigits)}`;
  }
};

export const sortThis = (array: any[], key: any) => {
  array.sort((a, b) => a[key] - b[key]);
};

export const isTheTwoArraysMatch = (arr: any[], target: any[]): boolean => {
  try {
    return target?.every(
      (v: any, i: number, array: any[]) =>
        arr.includes(v) && array.length === arr.length
    );
  } catch (error) {
    console.log(
      "%cPLS Send a correct array!",
      "color: #E03322; font-size: 1rem; font-weight: bold"
    );
    return false;
  }
};

export const swalAlert = ({
  title,
  text,
  handler,
  payload,
  parentTitle,
  parentText,
  cancelText,
  cancelDialogText,
  cancelDialogTitle,
  submitText,
}: IAlert) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger",
      cancelButton: "btn btn-text-success",
    },
    buttonsStyling: false,
  });
  const swalHandler = async () => {
    swalWithBootstrapButtons
      .fire({
        title: parentTitle || "Are you sure?",
        text: parentText || "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: submitText || "Yes, I'm sure!",
        cancelButtonText: cancelText || "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(title, text, "success");
          payload ? handler(payload) : handler();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            cancelDialogTitle || "Cancelled",
            cancelDialogText || "Nothing has changed :)",
            "error"
          );
        }
      });
  };

  return swalHandler();
};

export const screenDimensions = (): screenDimensionsObject => {
  const availWidth = window.innerWidth;
  const availHeight = window.innerHeight;

  return { availWidth, availHeight };
};

export const filterDuplicates = (array: any[]) => {
  return Array.from(new Set(array));
};

export const compareTwoDates = (date1: string, date2: string) => {
  const dateOne: Date = new Date(date1);
  const dateTwo: Date = new Date(date2);
  const currentDateSource: Date = new Date();

  const currentMonth = currentDateSource.getUTCMonth() + 1;
  const currentDay = currentDateSource.getUTCDate();
  const currentYear = currentDateSource.getUTCFullYear();

  const currentDate: Date = new Date(
    `${currentYear}-${currentMonth}-${currentDay}`
  );

  const days = (ms) => Math.floor(ms / (24 * 60 * 60 * 1000));

  const isDateOneGraterThanDateTwo = dateOne.getTime() > dateTwo.getTime();
  const isDateTwoGraterThanDateOne = dateTwo.getTime() > dateOne.getTime();
  const isCurrentDateGraterThanDateOne =
    currentDate.getTime() > dateOne.getTime();
  const isCurrentDateGraterThanDateTwo =
    currentDate.getTime() > dateTwo.getTime();

  const isDateTwoEqualDateOne = dateTwo.getTime() === dateOne.getTime();
  const isCurrentDateEqualDateOne = currentDate.getTime() === dateOne.getTime();
  const isCurrentDateEqualDateTwo = currentDate.getTime() === dateTwo.getTime();

  const isCurrentDateInBetween =
    isCurrentDateGraterThanDateOne && !isCurrentDateGraterThanDateTwo;

  const daysTillDate2 = days(dateTwo.getTime() - currentDate.getTime());

  const comingUpAfter = !isCurrentDateGraterThanDateTwo ? daysTillDate2 : -1;

  // only for discounts
  const notAllowedForDiscount =
    !isDateOneGraterThanDateTwo && !isCurrentDateGraterThanDateTwo;
  const allowedForDiscount =
    isDateTwoGraterThanDateOne ||
    isCurrentDateInBetween ||
    isCurrentDateEqualDateOne ||
    isCurrentDateEqualDateTwo ||
    isDateTwoEqualDateOne;

  const isValidForDiscount = notAllowedForDiscount && allowedForDiscount;

  return {
    isDateOneGraterThanDateTwo,
    isDateTwoGraterThanDateOne,
    isDateTwoEqualDateOne,
    isCurrentDateGraterThanDateOne,
    isCurrentDateGraterThanDateTwo,
    isCurrentDateEqualDateOne,
    isCurrentDateEqualDateTwo,
    isCurrentDateInBetween,
    comingUpAfter,
    isValidForDiscount,
  };
};

export const niceBytes = (x) => {
  const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  let l = 0,
    n = parseInt(x, 10) || 0;

  while (n >= 1024 && ++l) {
    n = n / 1024;
  }

  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
};
