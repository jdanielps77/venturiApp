function calcularCaudal() {
  // Obtener valores de entrada (en pulgadas)
  const d1 = parseFloat(document.getElementById('d1').value);
  const d2 = parseFloat(document.getElementById('d2').value);
  const h = parseFloat(document.getElementById('h').value);

  // Validar entradas
  if (isNaN(d1) || isNaN(d2) || isNaN(h)) {
    document.getElementById('resultado').innerHTML = "<p style='color: #6b7280;'>Por favor ingrese todos los datos.</p>";
    return;
  }

  if (d1 <= 0 || d2 <= 0 || h <= 0) {
    document.getElementById('resultado').innerHTML = "<p style='color: #6b7280;'>Todos los valores deben ser mayores que cero.</p>";
    return;
  }

  if (d2 >= d1) {
    document.getElementById('resultado').innerHTML = "<p style='color: #6b7280;'>D2 debe ser menor que D1 para un tubo Venturi.</p>";
    return;
  }

  // ================================
  // Conversión a sistema MKS (metros)
  // ================================
  const pulgadasAMetros = 0.0254;
  const d1_m = d1 * pulgadasAMetros; // metros
  const d2_m = d2 * pulgadasAMetros; // metros
  const h_m = h * pulgadasAMetros;   // metros

  // Áreas en m²
  const A1 = (Math.PI / 4) * Math.pow(d1_m, 2);
  const A2 = (Math.PI / 4) * Math.pow(d2_m, 2);

  // Constantes reales
  const g = 9.81; // m/s²
  const Cd = 0.98; // Coeficiente de descarga realista para tubo Venturi

  // Calcular caudal en m³/s
  const denominador = 1 - Math.pow(A2 / A1, 2);
  if (denominador <= 0) {
    document.getElementById('resultado').innerHTML = "<p style='color: #6b7280;'>Error: relación de áreas inválida.</p>";
    return;
  }

  const raiz = Math.sqrt((2 * g * h_m) / denominador);
  const Q_m3_s = Cd * A2 * raiz;

  // Convertir a litros por segundo (lps) y galones por minuto (GPM)
  const Q_lps = Q_m3_s * 1000;
  const Q_gpm = Q_lps * 15.8503; // 1 lps = 15.8503 GPM

  // Mostrar resultados en líneas separadas con formato claro
  document.getElementById('resultado').innerHTML = `
    <div style="text-align: center; margin-top: 12px;">
      <p style="margin: 0; font-weight: 600; color: #1e40af;">Caudal:</p>
      <p style="margin: 8px 0 0 0; font-size: 1.3rem; color: #2563eb; font-weight: 600;">
        ${Q_lps.toFixed(3)} <span style="font-size: 0.9rem; color: #60a5fa;">lps</span>
      </p>
      <p style="margin: 8px 0 0 0; font-size: 1.3rem; color: #2563eb; font-weight: 600;">
        ${Q_gpm.toFixed(2)} <span style="font-size: 0.9rem; color: #60a5fa;">GPM</span>
      </p>
    </div>
  `;
}
