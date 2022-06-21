(() => {
	console.log('[Github No Skip Ci] Plugin enabled');

	const descriptionTextareaSelector = '#merge_message_field';
	const messageSelector = 'github-pr-no-skip-ci';
	const buttonSelector = '[data-details-container=".js-merge-pr"]';
	const skipCiRegex = /\[(skip ci|ci skip|no ci|skip actions|actions skip)]/gim;
	const cleanDescription = () => {
		for (const x of document.querySelectorAll(`#${messageSelector}`)) {
			x.remove();
		}

		let removedOccurrence = 0;

		const descriptionTextarea = document.querySelector(descriptionTextareaSelector);

		const cleanDescription = descriptionTextarea.value.replaceAll(skipCiRegex, () => {
			removedOccurrence++;
			return '';
		});

		if (removedOccurrence > 0) {
			descriptionTextarea.value = cleanDescription;
			const parent = descriptionTextarea.closest('.write-content');

			const messageSpan = document.createElement('div');
			messageSpan.id = messageSelector;
			messageSpan.textContent = `🛡️ No skip ci: ${removedOccurrence} occurence${removedOccurrence > 1 ? 's' : ''} removed`;
			messageSpan.style.setProperty('color', 'var(--color-fg-muted)');
			messageSpan.style.setProperty('background-color', 'var(--color-canvas-subtle)');
			messageSpan.style.setProperty('border-radius', '6px');
			messageSpan.style.setProperty('padding', '5px 12px');
			messageSpan.style.setProperty('margin-bottom', '8px');
			parent.append(messageSpan);
		}
	};

	document.addEventListener('DOMContentLoaded', () => {
		document.addEventListener('change', event => {
			if (!event.target.matches(descriptionTextareaSelector) || event.isTrusted) {
				return;
			}

			cleanDescription();
		});

		document.addEventListener('click', event => {
			if (!event.target.matches(buttonSelector)) {
				return;
			}

			cleanDescription();
		});
	});
})();
