export function formatName(fullName) {
  const nameParts = fullName.trim().split(" ");
  // Se só tem um nome, retorna apenas ele
  if (nameParts.length === 1) {
    return nameParts[0];
  }
  // Se tem mais de um nome, retorna o primeiro e o último
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];

  // Evita o caso de repetir o mesmo nome
  if (firstName.toLowerCase() === lastName.toLowerCase()) {
    return firstName;
  }
  return `${firstName} ${lastName}`;
}
