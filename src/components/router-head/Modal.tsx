import { $, component$, Slot } from '@builder.io/qwik';

export const Modal = component$(({ onClose$ }: { onClose$: (() => void )}) => {
    return (
        <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white w-[500px] p-6 rounded-lg shadow-lg relative">
                {/* Close Button */}
                <button class="absolute top-2 right-2 text-xl" onClick$={onClose$}>
                    &times;
                </button>

                {/* Modal Content */}
                <div>
                    <Slot name="video" />
                    <Slot name="details" />
                </div>
            </div>
        </div>
    );
});
