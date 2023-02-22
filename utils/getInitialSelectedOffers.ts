import { IOffer } from '@/store/slice';

const baseMortgageDurations = [3, 5, 8, 10, 12, 15, 20, 25];
const mortgageDurationCount = baseMortgageDurations.length;

function calculateMedian(arr: number[]) {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

export default function getInitialSelectedOffers(offers: IOffer[]): number[] {
  if (!offers || offers?.length === 0) {
    return baseMortgageDurations;
  }

  // add all available durations
  let durations: number[] = [];
  baseMortgageDurations.forEach((durationItr) => {
    const durationOffer = offers?.find(
      (offerItr) => offerItr.duration === durationItr,
    );
    if (durationOffer) {
      durations.push(durationOffer.duration || 0);
    }
  });

  // sort by durations
  durations = durations.sort((a, b) => a - b);

  // check if durations has correct length
  if (durations.length <= baseMortgageDurations.length) {
    return durations;
  }

  // check if we need to remove one offer
  if (durations.length > baseMortgageDurations.length) {
    const medianBaseDuration = calculateMedian(baseMortgageDurations);
    if (medianBaseDuration < 10) {
      durations = durations.slice(1);
    } else {
      durations.pop();
    }
    return durations;
  }

  // sort the leftover offers and fill up array
  const unselectedDurations: number[] = [];

  // calculate how many durations are missing to fill the array
  const missingDurationsCount = mortgageDurationCount - durations.length;

  if (missingDurationsCount > unselectedDurations.length) {
    durations = durations.concat(unselectedDurations);
  } else {
    durations = durations.concat(
      unselectedDurations.slice(-missingDurationsCount),
    );
  }

  return durations.sort((a, b) => a - b);
}
