#include <stdio.h>

int main(){
    long long int factorial = 1;
    for(int i = 2; i <= 20; i++){
        factorial *= i;
    }
    printf("%lld\n", factorial);
    return 0;
}