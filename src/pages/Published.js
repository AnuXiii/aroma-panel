export default function Published() {
	return `
        <section class="section flex-col gap-8">
            <c-title
                data-title="لیست انتشارات"
                data-back="true"></c-title>
            <!--  -->
            <ul class="published-categoreis flex-item-center gap-3 mb-4 py-4 overflow-x-auto">
                <li>
                    <button
                        title="عکس های گالری"
                        aria-label="عکس های گالری"
                        tabindex="0"
                        data-index="0"
                        data-db="gallery"
                        class="get-category-btn bg-neutral-800 border-2 border-solid border-white/20 w-max py-2 px-3 rounded-full text-xl duration-200 hover:bg-yellow/20 active">
                        عکس های گالری
                    </button>
                </li>
                <li>
                    <button
                        title="دسته بندی منو"
                        aria-label="دسته بندی منو"
                        tabindex="0"
                        data-index="1"
                        data-db="menu"
                        class="get-category-btn bg-neutral-800 border-2 border-solid border-white/20 w-max py-2 px-3 rounded-full text-xl duration-200 outline-2 outline-solid outline-transparent hover:bg-yellow/20">
                        دسته بندی منو
                    </button>
                </li>
                <li>
                    <button
                        title="آیتم های منو"
                        aria-label="آیتم های منو"
                        tabindex="0"
                        data-index="2"
                        data-db="items"
                        class="get-category-btn bg-neutral-800 border-2 border-solid border-white/20 w-max py-2 px-3 rounded-full text-xl duration-200 outline-2 outline-solid outline-transparent hover:bg-yellow/20">
                        آیتم های منو
                    </button>
                </li>
            </ul>
            <!--  -->
            <div class="flex-col md:flex-row w-full flex-between-center gap-3 mt-10 mb-5 py-10 border-t border-b border-solid border-white/20">
                <h1 class="font-semibold text-white/90 text-2xl">مرتب سازی آیتم ها</h1>
                <c-select
                    data-id="sort"
                    data-default="newset"
                    data-value="مرتب سازی بر اساس"
                    data-options='[
                        {"value": "newset", "text": "بر اساس جدیدترین"}, 
                        {"value": "oldset", "text": "بر اساس قدیمی ترین"}
                    ]'
                    class="w-full md:w-96"></c-select>
            </div>
            <!--  -->
            <div class="w-full overflow-x-auto">
                <table class="border-separate border-spacing-y-8 text-center w-full">
                    <tr>
                        <th class="whitespace-nowrap p-4 text-xl md:text-2xl font-semibold text-cream/90">آیدی</th>
                        <th class="whitespace-nowrap p-4 text-xl md:text-2xl font-semibold text-cream/90">عنوان</th>
                        <th class="whitespace-nowrap p-4 text-xl md:text-2xl font-semibold text-cream/90">عکس</th>
                        <th class="whitespace-nowrap p-4 text-xl md:text-2xl font-semibold text-cream/90">اقدامات</th>
                    </tr>
                    <!--  -->
                    <tbody class="published-table relative">
                        <!-- data here -->
                    </tbody>
                    <!--  -->
                </table>
            </div>
        </section>
        <!--  -->

        <!-- edit modal when user clicked on edit button in menu items showed -->
        <div
            id="editModal"
            class="modal hidden fade-in overflow-y-auto fixed inset-0 bg-black/50 backdrop-blur-md z-101">
            <div class="modal-content bg-neutral-900 border border-white/10 rounded-lg p-6 w-[720px] max-w-[95%] mx-auto my-20">
                <div class="flex-between-center mb-20">
                    <h3 class="text-cream text-2xl font-semibold">ویرایش محصول</h3>
                    <button
                        id="closeModal"
                        title="بستن مودال"
                        aria-label="close modal"
                        class="btn w-max bg-rose-500 outline-rose-500 text-white">
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                </div>

                <!-- disabled default validation form elements -->
                <div class="form-control">
                    <form
                        novalidate
                        id="items"
                        name="items"
                        class="edit-form">
                        <c-input
                            data-type="text"
                            data-id="title"
                            data-label="نام محصول"
                            data-tooltip="حداقل کاراکتر مجاز 30"></c-input>
                        <c-input
                            data-type="number"
                            data-id="price"
                            data-label="قیمت"
                            data-tooltip="قیمت های خود را به صورت 2 و یا 3 رقمی وارد نمایید"></c-input>
                        <c-input
                            data-type="number"
                            data-id="double-price"
                            data-label="قیمت دابل (اگر موجود است)"
                            data-tooltip="محصول فوق اگر دابل شات ندارد عدد 0 را وارد کنید"></c-input>
                        <c-select
                            data-id="category"
                            data-options></c-select>
                        <c-input
                            data-type="textarea"
                            data-id="desc"
                            data-label="توضیحات کوتاه"
                            data-tooltip="توضیح کوتاهی درباره محصول بنویسید. حداقل کاراکتر مجاز 200"></c-input>
                        <c-input
                            data-type="file"
                            data-id="image"
                            data-label="تصویر محصول"></c-input>
                        <c-button
                            data-value="ویرایش"
                            data-type="submit"></c-button>
                    </form>
                </div>
            </div>
        </div>
    `;
}
