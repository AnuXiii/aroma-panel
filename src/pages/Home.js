export default function Home() {
	return `
        <section class="section min-h-screen flex-center gap-8 flex-col">
            <c-title
                data-title="به پنل کاربری خوش آمدید"
                data-sub-title="لطفاً از منوی سمت راست، بخش مورد نظر خود را انتخاب کنید.">
            </c-title>
            <ul class="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
                <li class="w-full flex-center gap-4 shadow-yellow/10 shadow-2xl flex-col bg-gradient-to-r from-yellow/20 via-neutral-900 to-neutral-800 p-4 border border-solid border-white/10 rounded-lg">
                    <ion-icon class="text-4xl text-yellow" name="images"></ion-icon>
                    <h2 class="text-center text-xl text-cream/70">افزودن تصویر</h2>
                </li>
                <li class="w-full flex-center gap-4 shadow-yellow/10 shadow-2xl flex-col bg-gradient-to-r from-yellow/20 via-neutral-900 to-neutral-800 p-4 border border-solid border-white/10 rounded-lg">
                    <ion-icon class="text-4xl text-yellow" name="grid"></ion-icon>
                    <h2 class="text-center text-xl text-cream/70">افزودن منو</h2>
                </li>
                <li class="w-full flex-center gap-4 shadow-yellow/10 shadow-2xl flex-col bg-gradient-to-r from-yellow/20 via-neutral-900 to-neutral-800 p-4 border border-solid border-white/10 rounded-lg">
                    <ion-icon class="text-4xl text-yellow" name="cafe"></ion-icon>
                    <h2 class="text-center text-xl text-cream/70">افزودن آیتم منو</h2>
                </li>
                <li class="w-full flex-center gap-4 shadow-yellow/10 shadow-2xl flex-col bg-gradient-to-r from-yellow/20 via-neutral-900 to-neutral-800 p-4 border border-solid border-white/10 rounded-lg md:col-span-3 lg:col-span-1">
                    <ion-icon class="text-4xl text-yellow" name="server"></ion-icon>
                    <h2 class="text-center text-xl text-cream/70">مشاهده انتشارات</h2>
                </li>
            </ul>
        </section>
    `;
}
