export function getDaysUntilDate(date: string) {
	if (!date) {
		return "";
	}

	const today = new Date();
	let untilDate = new Date(date);

	let timeDifference = untilDate.getTime() - today.getTime();
	let daysBetween = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

	return daysBetween;
}

export function getDateFromSeconds(seconds: number) {
	var t = new Date(1970, 0, 1);
	t.setSeconds(seconds);

	return t;
}
