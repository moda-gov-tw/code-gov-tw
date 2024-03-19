import { component$, useSignal, $ } from "@builder.io/qwik";
import ChevronLeftIcon from "~/media/icons/chevron-left-icon-light.svg?jsx";
import ChevronRightIcon from "~/media/icons/chevron-right-icon-light.svg?jsx";

type CarouselProps = {
  images: string[];
};

export default component$<CarouselProps>(({ images }) => {
  const containerRef = useSignal<HTMLElement>();
  const pointsRef = useSignal<HTMLElement>();
  const currentIndex = useSignal(0);
  const isMoving = useSignal(false);
  const startX = useSignal(0);

  const nextSlide = $(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
  });

  const prevSlide = $(() => {
    currentIndex.value =
      (currentIndex.value - 1 + images.length) % images.length;
  });

  const handleTouchStart = $((e: TouchEvent) => {
    isMoving.value = true;
    startX.value = e.touches[0].clientX;
  });

  const handleTouchEnd = $(() => {
    isMoving.value = false;
  });

  const handleTouchMove = $((e: TouchEvent) => {
    if (!isMoving.value) return;
    const currentX = e.touches[0].clientX;
    const diff = startX.value - currentX;
    if (diff > 100) {
      nextSlide();
      isMoving.value = false;
    }
    if (diff < -100) {
      prevSlide();
      isMoving.value = false;
    }
  });

  const handleMouseDown = $((e: MouseEvent) => {
    isMoving.value = true;
    startX.value = e.clientX;
  });
  const handleMouseUp = $(() => {
    isMoving.value = false;
    if (containerRef.value) containerRef.value.style.transform = "";
  });
  const handleMouseMove = $((e: MouseEvent) => {
    if (!isMoving.value) return;
    const currentX = e.clientX;
    const diff = startX.value - currentX;
    if (containerRef.value)
      containerRef.value.style.transform = `translateX(${-diff}px)`;
    if (diff > 100) {
      nextSlide();
      isMoving.value = false; // Add this line to prevent moving more than one slide
    }
    if (diff < -100) {
      prevSlide();
      isMoving.value = false; // Add this line to prevent moving more than one slide
    }
  });

  return (
    <div class="flex flex-col items-center gap-4">
      <div class="flex items-center gap-4">
        <button
          class="hidden md:block"
          onClick$={prevSlide}
          aria-label="Previous Image"
        >
          <ChevronLeftIcon class="h-14 w-14" />
        </button>
        <div
          ref={containerRef}
          onTouchStart$={handleTouchStart}
          onTouchEnd$={handleTouchEnd}
          onTouchMove$={handleTouchMove}
          onMouseDown$={handleMouseDown}
          onMouseUp$={handleMouseUp}
          onMouseMove$={handleMouseMove}
          class="w-full overflow-hidden transition-transform duration-500 ease-in-out"
        >
          <div class="slider flex snap-x">
            {images.map((imageSrc, index) => (
              <div
                key={index}
                class={[
                  "slide w-full shrink-0",
                  currentIndex.value === index ? "" : "hidden",
                ]}
              >
                <img
                  src={imageSrc}
                  width="1046"
                  height="640"
                  alt={`Screenshot ${index + 1}`}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          class="hidden md:block"
          onClick$={nextSlide}
          aria-label="Next Image"
        >
          <ChevronRightIcon class="h-14 w-14" />
        </button>
      </div>
      <div ref={pointsRef} class="flex gap-4">
        {images.map((_, index) => (
          <div
            key={index}
            class={[
              "indicator h-3 w-3 rounded-full",
              currentIndex.value === index ? "bg-brand-primary" : "bg-gray-400",
            ]}
          />
        ))}
      </div>
    </div>
  );
});
