#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <unistd.h> 


typedef struct {
    char *className;
    bool display;
    bool active;
} Slide;

typedef struct {
    bool invert_icon;
} Img;

typedef struct {
    Slide *slides;
    int slides_count;
    Img *imgs;
    int imgs_count;
    int slideIndex;
    bool dark_mode;
} Document;

void toggleDarkMode(Document *doc) {
    doc->dark_mode = !doc->dark_mode;
    if (doc->dark_mode) {
        printf("Dark mode enabled: showing sun icon and Light Mode text\n");
        for (int i = 0; i < doc->imgs_count; i++) {
            doc->imgs[i].invert_icon = true;
        }
    } else {
        printf("Dark mode disabled: showing moon icon and Dark Mode text\n");
        for (int i = 0; i < doc->imgs_count; i++) {
            doc->imgs[i].invert_icon = false;
        }
    }
}

void showSlides(Document *doc, int n) {
    if (n >= doc->slides_count) {
        doc->slideIndex = 0;
    } else if (n < 0) {
        doc->slideIndex = doc->slides_count - 1;
    } else {
        doc->slideIndex = n;
    }

    for (int i = 0; i < doc->slides_count; i++) {
        doc->slides[i].display = false;
        doc->slides[i].active = false;
    }
    doc->slides[doc->slideIndex].display = true;
    doc->slides[doc->slideIndex].active = true;

    printf("Showing slide %d\n", doc->slideIndex);
}

void nextSlide(Document *doc) {
    showSlides(doc, doc->slideIndex + 1);
}

void previousSlide(Document *doc) {
    showSlides(doc, doc->slideIndex - 1);
}

void autoSlides(Document *doc) {
    while (true) {
        nextSlide(doc);
        sleep(2);
    }
}

int main() {
   
    int slides_count = 3;
    Slide slides[3] = {
        {.className = "mySlides", .display = false, .active = false},
        {.className = "mySlides", .display = false, .active = false},
        {.className = "mySlides", .display = false, .active = false}
    };

    int imgs_count = 2;
    Img imgs[2] = {
        {.invert_icon = false},
        {.invert_icon = false}
    };

    Document doc = {
        .slides = slides,
        .slides_count = slides_count,
        .imgs = imgs,
        .imgs_count = imgs_count,
        .slideIndex = 0,
        .dark_mode = false
    };

    doc.dark_mode = false;
    for (int i = 0; i < imgs_count; i++) {
        doc.imgs[i].invert_icon = false;
    }
    printf("Initial mode: Dark Mode off, showing moon icon\n");

    toggleDarkMode(&doc);
    toggleDarkMode(&doc);

    showSlides(&doc, 0);
    nextSlide(&doc);
    previousSlide(&doc);

    return 0;
}