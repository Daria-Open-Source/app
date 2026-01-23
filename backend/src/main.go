package main

import "fmt"

func RectangleArea(length, width float64) float64 {
	return length * width
}

func main() {
	l, w := 10.5, 5.0
	area := RectangleArea(l, w)

	fmt.Printf("Calculating Area...\n")
	fmt.Printf("Length: %.2f, Width: %.2f\n", l, w)
	fmt.Printf("The area of the rectangle is: %.2f\n", area)
}