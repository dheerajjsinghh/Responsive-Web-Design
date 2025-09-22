const input = document.getElementById("text-input");
const button = document.getElementById("check-btn");
const result = document.getElementById("result");

function isPalindrome(str) {
  // remove non-alphanumeric characters, lowercase everything
  const cleaned = str.replace(/[^a-z0-9]/gi, "").toLowerCase();
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}

button.addEventListener("click", () => {
  const text = input.value;

  if (!text) {
    alert("Please input a value");
    return;
  }

  if (isPalindrome(text)) {
    result.textContent = `${text} is a palindrome.`;
  } else {
    result.textContent = `${text} is not a palindrome.`;
  }
});
