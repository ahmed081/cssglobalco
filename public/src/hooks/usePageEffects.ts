import {useEffect} from "react";

const usCosts: Record<string, number> = {cs: 5200, sdr: 7000, it: 12000};
const cssCosts: Record<string, number> = {cs: 2800, sdr: 3800, it: 5500};
const onbFees: Record<string, number> = {cs: 1200, sdr: 1500, it: 1800};

function money(value: number) {
    return "$" + value.toLocaleString();
}

function setText(id: string, value: string | number) {
    const el = document.getElementById(id);
    if (el) el.textContent = String(value);
}

function normalizeLinks() {
    document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((anchor) => {
        const href = anchor.getAttribute("href");
        if (!href) return;
        anchor.setAttribute(
            "href",
            href
                .replace("index.html#", "/#")
                .replace("services.html#", "/services#")
                .replace("pricing.html#", "/pricing#")
                .replace("index.html", "/")
                .replace("services.html", "/services")
                .replace("pricing.html", "/pricing")
        );
    });
}

export function usePageEffects() {
    useEffect(() => {
        normalizeLinks();

        const observer = new IntersectionObserver(
            (entries) =>
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in");
                        observer.unobserve(entry.target);
                    }
                }),
            {threshold: 0.12, rootMargin: "0px 0px -40px 0px"}
        );
        document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const tzInput = document.getElementById("user-timezone") as HTMLInputElement | null;
        const tzDisplay = document.getElementById("tz-display");
        if (tzInput) tzInput.value = tz;
        if (tzDisplay) tzDisplay.textContent = "Your timezone: " + tz;

        const appointmentDate = document.getElementById("appt-date") as HTMLInputElement | null;
        if (appointmentDate) {
            appointmentDate.removeAttribute("readonly");
            appointmentDate.type = "date";
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            appointmentDate.min = tomorrow.toISOString().slice(0, 10);
        }

        const slotHandlers: Array<[Element, EventListener]> = [];
        document.querySelectorAll(".time-slot").forEach((button) => {
            const handler = () => {
                document.querySelectorAll(".time-slot").forEach((b) => b.classList.remove("selected"));
                button.classList.add("selected");
                const hidden = document.getElementById("appt-time") as HTMLInputElement | null;
                if (hidden) hidden.value = (button as HTMLElement).dataset.time || (button.textContent || "").trim();
            };
            button.addEventListener("click", handler);
            slotHandlers.push([button, handler]);
        });

        const formHandlers: Array<[HTMLFormElement, EventListener]> = [];
        document.querySelectorAll<HTMLFormElement>("form").forEach((form) => {
            const handler = async (event: Event) => {
                event.preventDefault();
                const msg = form.querySelector<HTMLElement>("#form-msg") || document.getElementById("form-msg");
                const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
                const original = btn?.textContent || "Send message";
                if (btn) {
                    btn.textContent = "Sending...";
                    btn.disabled = true;
                    btn.style.opacity = ".72";
                }
                await new Promise((resolve) => setTimeout(resolve, 450));
                if (msg) {
                    msg.textContent = "Got it — we'll be in touch within 24 hours.";
                    msg.style.color = "#1a6e42";
                }
                form.reset();
                document.querySelectorAll(".time-slot").forEach((b) => b.classList.remove("selected"));
                if (btn) {
                    btn.textContent = original;
                    btn.disabled = false;
                    btn.style.opacity = "1";
                }
            };
            form.addEventListener("submit", handler);
            formHandlers.push([form, handler]);
        });

        const switchPanel = (panelPrefix: string, panelClass: string, tabScope: string) => (id: string, btn: HTMLElement) => {
            document.querySelectorAll(panelClass).forEach((panel) => panel.classList.remove("active"));
            document.querySelectorAll(`${tabScope} .role-tab`).forEach((tab) => tab.classList.remove("active"));
            document.getElementById(panelPrefix + id)?.classList.add("active");
            btn?.classList.add("active");
        };

        (window as unknown as { switchVs: unknown }).switchVs = switchPanel("vs-", ".vs-panel", ".vs-tabs");
        (window as unknown as { switchRole: unknown }).switchRole = switchPanel("role-", ".role-panel", ".tier-tabs");

        const calcSavings = () => {
            const roleEl = document.getElementById("c-role") as HTMLSelectElement | null;
            const repsEl = document.getElementById("c-reps") as HTMLInputElement | null;
            const monthsEl = document.getElementById("c-months") as HTMLInputElement | null;
            if (!roleEl || !repsEl || !monthsEl) return;

            const role = roleEl.value;
            const reps = Number.parseInt(repsEl.value || "1", 10);
            const months = Number.parseInt(monthsEl.value || "12", 10);
            const usTotal = (usCosts[role] || 0) * reps * months;
            const cssTotal = (cssCosts[role] || 0) * reps * months;
            const onboarding = (onbFees[role] || 0) * reps;

            setText("reps-val", reps);
            setText("months-val", months);
            setText("c-us-total", money(usTotal));
            setText("c-css-total", money(cssTotal));
            setText("c-onb", money(onboarding));
            setText("c-saving", money(Math.max(0, usTotal - cssTotal - onboarding)));
        };

        (window as unknown as { calcSavings: () => void }).calcSavings = calcSavings;
        calcSavings();

        const calculatorInputs = document.querySelectorAll<HTMLInputElement | HTMLSelectElement>("#c-role, #c-reps, #c-months");
        calculatorInputs.forEach((input) => {
            input.addEventListener("input", calcSavings);
            input.addEventListener("change", calcSavings);
        });

        return () => {
            observer.disconnect();
            slotHandlers.forEach(([el, handler]) => el.removeEventListener("click", handler));
            formHandlers.forEach(([form, handler]) => form.removeEventListener("submit", handler));
            calculatorInputs.forEach((input) => {
                input.removeEventListener("input", calcSavings);
                input.removeEventListener("change", calcSavings);
            });
        };
    }, []);
}
