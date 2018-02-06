function resizable(domId, options = {}) {
	if(!domId) return;
	let startX, startY, startWidth, startHeight,
		handler = document.createElement('div'),
		node = document.querySelector(domId),
		{minX = 0, minY = 0, onStopResize = () => {}} = options;

	node.classList.add('resizable');

	handlerStyles = {
		cursor: 'se-resize',
		bottom: 0,
		right: 0,
		width: '10px',
		height: '10px',
		position: 'absolute',
		borderRight: '2px solid #000',
		borderBottom: '2px solid #000',
		margin: '5px',
		userSelect: 'none'
	}

	for(i in handlerStyles) {
		handler.style[i] = handlerStyles[i];
	}

	node.appendChild(handler);

	const resizing = e => {
		let width = startWidth + e.clientX - startX,
			height = startHeight + e.clientY - startY;

		width >= minX ? node.style.width = width + 'px' : node.style.width = minX + 'px';
		height >= minY ? node.style.height = height + 'px' : node.style.height = minY + 'px';
	}

	const stopResize = e => {
		let width = node.style.width,
			height = node.style.height;

		document.documentElement.removeEventListener('mousemove', resizing);
		document.documentElement.removeEventListener('mouseup', stopResize);
		onStopResize({width, height});
	}

	const startResize = e => {
		startX = e.clientX;
		startY = e.clientY;
		startWidth = parseInt(document.defaultView.getComputedStyle(node).width, 10);
		startHeight = parseInt(document.defaultView.getComputedStyle(node).height, 10);
		document.documentElement.addEventListener('mousemove', resizing);
		document.documentElement.addEventListener('mouseup', stopResize);
	}

	handler.addEventListener('mousedown', startResize);	
}