const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mX = 0, mY = 0, pX = 0, pY = 0, fX = 0, fY = 0;

document.addEventListener('mousemove', (e) => { mX = e.clientX; mY = e.clientY; });

function animateCursor() {
    pX += (mX - pX) * 0.2; pY += (mY - pY) * 0.2;
    fX += (mX - fX) * 0.1; fY += (mY - fY) * 0.1;
    cursor.style.left = `${pX}px`; cursor.style.top = `${pY}px`;
    follower.style.left = `${fX}px`; follower.style.top = `${fY}px`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, li').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(4)';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.border = '1px solid var(--accent-color)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = 'var(--accent-color)';
        cursor.style.border = 'none';
    });
});

new SplitType('.char-anim', { types: 'chars' });
gsap.from('.char-anim .char', {
    y: 100, opacity: 0, duration: 1.2, stagger: 0.02, ease: 'power4.out', delay: 0.5
});

gsap.from('.fade-in-up', { y: 40, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 1 });

document.querySelectorAll('.reveal-img').forEach(el => {
    ScrollTrigger.create({
        trigger: el, start: "top 80%",
        onEnter: () => el.classList.add('in-view'),
        onLeaveBack: () => el.classList.remove('in-view')
    });
});

document.querySelectorAll('.parallax-img').forEach(img => {
    gsap.to(img, {
        y: '15%',
        scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom', end: 'bottom top',
            scrub: true
        }
    });
});