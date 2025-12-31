(function () {

    const bubbleContainer = document.getElementById("bubble-container");
    if (!bubbleContainer) return;

    const mode = bubbleContainer.dataset.bubbleMode || "index";
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const isLowPerformance = window.innerWidth < 600;

    const configs = {
        index: {
            class: "bubble",
            desktop: { initial: 50, minSize: 20, maxSize: 100, minDur: 4, maxDur: 9 },
            mobile:  { initial: 15, minSize: 15, maxSize: 60,  minDur: 5, maxDur: 10 }
        },
        jeu: {
            class: "smallbubble",
            desktop: { initial: 80, minSize: 5,  maxSize: 15, minDur: 3, maxDur: 6 },
            mobile:  { initial: 25, minSize: 5,  maxSize: 12, minDur: 4, maxDur: 7 }
        }
    };

    const cfg = configs[mode];
    if (!cfg) return;

    const perf = (!isMobile && !isLowPerformance) ? cfg.desktop : cfg.mobile;

    function createBubble() {
        const bubble = document.createElement("div");
        bubble.classList.add(cfg.class);

        const size = Math.random() * (perf.maxSize - perf.minSize) + perf.minSize;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        bubble.style.left = `${Math.random() * 100}%`;

        const duration = Math.random() * (perf.maxDur - perf.minDur) + perf.minDur;
        bubble.style.animationDuration = `${duration}s`;

        bubbleContainer.appendChild(bubble);
        bubble.addEventListener("animationend", () => bubble.remove());
    }

    for (let i = 0; i < perf.initial; i++) {
        setTimeout(createBubble, i * 200);
    }

    (function bubbleLoop() {
        createBubble();
        setTimeout(bubbleLoop, Math.random() * 400 + 300);
    })();

})();
