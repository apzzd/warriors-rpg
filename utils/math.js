

function randf(min, max) {
	if (max == null) {
		max = min || 1;
		min = 0;
	}
	return min + (Math.random() * (max - min));
}

function rand(min, max) {
	return Math.floor(randf(min, max));
}

function randOneIn(max = 2) {
	return rand(0, max) === 0;
}

function clamp(x, min, max) {
	return Math.max(min, Math.min(x, max))
}

function distance (a, b) {
	const dx = a.x - b.x
	const dy = a.y - b.y
	return Math.sqrt(dx * dx + dy * dy)
}

function randOneFrom(items) {
	return items[rand(items.length)];
}

export default {
	rand,
	randf,
	randOneIn,
	randOneFrom,
	distance,
	clamp
}